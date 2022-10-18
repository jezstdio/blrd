const path = require("path");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });
const { MongoClient } = require("mongodb");
const redisClient = require("redis");

const {
    MONGODB_USR, MONGODB_PWD, MONGODB_HOST, MONGODB_PORT,
    REDIS_HOST, REDIS_PORT, REDIS_PWD
} = process.env;
const mongo = {
    connection: null,
    db: "blrd",
    col: "votes",
    url: `mongodb://${MONGODB_USR}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/blrd`
}

const redis = redisClient.createClient({
    socket: {
        port: REDIS_PORT,
        host: REDIS_HOST
    },
    password: REDIS_PWD
});

const ready = {
    mongodb: false,
    redis: false
}

const readyCheck = setInterval(() => {
    if (Object.keys(ready).every(item => ready[item])) {
        console.log("both mongodb and redis are connected!");

        clearInterval(readyCheck);
        updateRedis();
    }
}, 250);

redis.connect();

MongoClient.connect(mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) throw err;

    mongo.connection = client.db();

    console.log("mongodb connected!");
    ready.mongodb = true;
});

redis.on('ready', () => {
    console.log('redis connected!');
    ready.redis = true;
});

redis.on('error', err => console.log(err));

async function updateRedis() {
    const collection = await mongo.connection.collection(mongo.col);
    const mongodbVotes = await collection.find({}).toArray();
    const keys = await redis.keys("*");
    const redisVotes = await Promise.all(keys.map(async key => JSON.parse(await redis.get(key))));

    if (redisVotes.length === 0) {
        mongodbVotes.forEach(vote => redis.set(vote._id, JSON.stringify(vote)));
        console.log("redis is refilled!");
    }

    console.log("redis is already filled!");
}

typeof module !== "undefined" && module.exports ? module.exports = { mongo, redis } : false;