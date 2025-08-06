// websocket.js
import { WebSocketServer } from "ws"

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    try {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } catch (error) {
      console.error("WebSocket upgrade error:", error);
      socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
      socket.destroy();
    }
  });

  wss.on("connection", (ws, request) => {
    console.log("WebSocket client connected");

    ws.send("Connection established");

    ws.on("message", (message) => {
      console.log(`Received message => ${message}`);
      ws.send(`You said: ${message}`);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
      console.log("Current client count:", wss.clients.size);
    });
  });
};
