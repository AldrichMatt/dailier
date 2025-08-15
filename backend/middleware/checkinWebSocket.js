import { WebSocketServer } from "ws";
import cookie from "cookie"

const clients = new Map();

export const checkinWebSocket = (server) => {
    const wss = new WebSocketServer({ noServer : true })

    server.on("upgrade", async (req, socket, head) => {
        const token = cookie.parse(req.headers.cookie || "").session_id

        if(!token){
            socket.destroy()
            return;
        }   

        wss.handleUpgrade(req, socket, head, (ws) => {
            ws.user_id = token;
            clients.set(token, ws); // simpan koneksi sesuai user
            wss.emit("connection", ws, req);
        });
    });

    wss.on("connection", async (client) => {
        console.log(`User ${client.user_id} Connected!`);
        console.log(wss.listenerCount());
        

        client.on("close", () => {
            clients.delete(client.user_id)
        })
    })
}

export function sendToUser(user_id, payload){
    console.log(user_id);
    const client = clients.get(`${user_id}`)
    if (client && client.readyState === WebSocket.OPEN) {
        if(payload.length != 0){
            try {
                console.log(payload);
                client.send(JSON.stringify(payload));
            } catch (error) {
                console.log(error);
            }
        }else{

        }
  }
}
