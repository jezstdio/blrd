import axios from "axios";

const production = `${window.location.host}`;
const development = `${window.location.hostname}:4320`;
const current = process.env.NODE_ENV === "production" ? production : development;

export const api = axios.create({
    baseURL: `https://${current}`,
    timeout: 8000,
    withCredentials: true,
    mode: "cors",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export function webSocket(props) {
    const socket = new WebSocket(`wss://${current}/${props.vote}`);
    let ping = null;

    function ws_open(e) {
        ping = setInterval(() => socket.send(JSON.stringify({
            type: "ping"
        })), 1000);
        props.setIsLoading(false);
    }

    function ws_close(e) {
        props.setIsLoading(true);
        clearInterval(ping);
        setTimeout(e => {
            props.ws.current = new webSocket(props);
        }, 1000);
    }

    socket.onopen = ws_open;
    socket.onmessage = e => ws_message(e, props.setVariable);
    socket.onclose = ws_close;
    socket.onerror = e => console.log(e);

    return socket;
};

function ws_message(e, setVariable) {
    const data = JSON.parse(e.data);

    if (data.type === "vote") { setVariable(data.vote) }
}