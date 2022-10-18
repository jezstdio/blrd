const https = require('https');
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });
const { mongo, redis } = require("./database");
const cron = require("node-cron")
const connections = {};

const cert = {
    key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY)),
    cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT))
};
const server = https.createServer(cert, app);
const websocket = require("express-ws")(app, server);

app.enable('trust proxy');

app.use(cors({
    origin: (origin, callback) => {
        const PORT = process.env.NODE_ENV === "development" ? process.env.CLIENT_PORT : process.env.SERVER_PORT
        const whitelist = [`https://localhost:${PORT}`, `https://192.168.1.70:${PORT}`, `https://jezstdio.synology.me:${PORT}`, "https://blrd.jezstd.io"];

        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, '/')));

app.get("/votes/popular", async (req, res) => {
    const category = req.query.category;
    const keys = await redis.keys("*");
    const votes = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));
    const publicVotes = votes
        .sort((a, b)=> {
            const aa = a.teams.red.scores[a.teams.red.scores.length - 1] + a.teams.blue.scores[a.teams.blue.scores.length - 1];
            const bb = b.teams.red.scores[b.teams.red.scores.length - 1] + b.teams.blue.scores[b.teams.blue.scores.length - 1];

            return bb - aa;
        }) // sort by highest to lowest
        .filter(vote => vote.published === true) // is the vote allowed to play?
        .filter(vote => vote.type === "public") // is it public, private or 1o1?
        .filter(vote => category ? vote.category.some(cat => cat.toLowerCase() === category && vote) : vote) // filter depending on category
        .filter(vote => vote.times.end[vote.times.end.length - 1] > new Date().getTime()) // is the vote still going?
        .filter(vote => vote.times.begin[vote.times.begin.length - 1] < new Date().getTime()) // is the vote begun?
        .slice(0, 7); // show the best 7 votes

    res.status(200).json(publicVotes);
})

app.get("/votes/open", async (req, res) => {
    const category = req.query.category;
    const keys = await redis.keys("*");
    const votes = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));
    const openVotes = votes
        .sort((a, b)=> {
            const aa = a.times.begin[a.times.begin.length - 1] + a.times.begin[a.times.begin.length - 1];
            const bb = b.times.begin[b.times.begin.length - 1] + b.times.begin[b.times.begin.length - 1];

            return bb - aa;
        }) // sort by highest to lowest
        .filter(vote => vote.published === true) // is the vote allowed to play?
        .filter(vote => vote.type === "public") // is it public, private or 1o1?
        .filter(vote => category ? vote.category.some(cat => cat.toLowerCase() === category && vote) : vote) // filter depending on category
        .filter(vote => vote.times.end[vote.times.end.length - 1] > new Date().getTime()) // is the vote still going?
        .filter(vote => vote.times.begin[vote.times.begin.length - 1] < new Date().getTime()) // is the vote begun?

    res.status(200).json(openVotes);
})

app.get("/votes/ended", async (req, res) => {
    const category = req.query.category;
    const keys = await redis.keys("*");
    const votes = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));
    const endedVotes = votes
        .sort((a, b)=> {
            const aa = a.times.end[a.times.end.length - 1] + a.times.end[a.times.end.length - 1];
            const bb = b.times.end[b.times.end.length - 1] + b.times.end[b.times.end.length - 1];

            return bb - aa;
        }) // sort by highest to lowest
        .filter(vote => vote.published === true) // is the vote allowed to play?
        .filter(vote => vote.type === "public") // is it public, private or 1o1?
        .filter(vote => category ? vote.category.some(cat => cat.toLowerCase() === category && vote) : vote) // filter depending on category
        .filter(vote => vote.times.end[vote.times.end.length - 1] < new Date().getTime()) // is the vote ended?

    res.status(200).json(endedVotes);
})

app.get("/vote", async (req, res) => {
    const id = req.query.id;
    const vote = JSON.parse(await redis.get(id));
    const isOpen = vote.times.end[vote.times.end.length - 1] > new Date().getTime() && vote.times.begin[vote.times.begin.length - 1] < new Date().getTime()
        ? true
        : false;

    if (vote.published) {
        res.status(200).json({ vote, isOpen });
    } else {
        res.status(503);
    }
});

app.ws("/:vote", async (ws, req) => {
    if (connections[req.params.vote]) {
        connections[req.params.vote].push(ws);
    } else {
        connections[req.params.vote] = [ws];
    }

    ws.on("message", async msg => {
        const message = JSON.parse(msg);

        if (message.type === "ping") {
            ws.send(JSON.stringify({ type: "pong" }));
        }

        if (message.type === "vote") {
            const id = message.vote.id;
            const team = message.vote.team;
            const vote = JSON.parse(await redis.get(id));
        
            if (message.trusted) {
                vote.teams[team].scores[vote.teams[team].scores.length - 1] += 1
            }
        
            await redis.set(id, JSON.stringify(vote));
    
            connections[message.vote.id].forEach(connection => connection.send(JSON.stringify({ type: "vote", vote })));
        }
    });

    ws.on("close", () => ws.close());
})

app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

cron.schedule('0 * * * *', async () => {
    const collection = await mongo.connection.collection(mongo.col);
    const keys = await redis.keys("*");
    const votes = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));

    votes.forEach(vote => {
        collection.updateOne({ "_id": vote._id }, {
            $set: {
                "teams.red.scores": vote.teams.red.scores,
                "teams.blue.scores": vote.teams.blue.scores
            }
        })
    });

    redis.sendCommand(['BGREWRITEAOF']);
});

async function cronTesting() {
    const keys = await redis.keys("*");
    const votes = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));
    const jobs = {};

    votes.forEach(vote => {
        if (vote.times.begin[vote.times.begin.length - 1] > new Date().getTime()) {
            const dates = {
                seconds: new Date(vote.times.begin[vote.times.begin.length - 1]).getSeconds(),
                minutes: new Date(vote.times.begin[vote.times.begin.length - 1]).getMinutes(),
                hours: new Date(vote.times.begin[vote.times.begin.length - 1]).getHours(),
                days: new Date(vote.times.begin[vote.times.begin.length - 1]).getDate(),
                month: new Date(vote.times.begin[vote.times.begin.length - 1]).getMonth() + 1
            }

            jobs[vote._id] = cron.schedule(`${dates.seconds} ${dates.minutes} ${dates.hours} ${dates.days} ${dates.month} *`, () => {
                console.log(`${vote._id} has started!`);
            })
        }
    });
}

setTimeout(cronTesting, 5000);

server.listen(process.env.NODE_ENV !== "development" ? process.env.CLIENT_PORT : process.env.SERVER_PORT); 