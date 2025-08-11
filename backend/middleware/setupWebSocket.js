import { WebSocketServer } from "ws";
import { broadcastPipeline, individualPipeline } from "./pipeline.js";
import { getHabitById } from "../models/habitModel.js";

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ noServer : true })

  server.on("upgrade", async (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  // broadcastPipeline(wss.clients);

  wss.on("connection", async (client) => {
    // const interval = individualPipeline(client);

    console.log("WebSocket client connected");
    client.send(JSON.stringify("connected"));

    

    wss.on("close", () => {
      console.log("closed", wss.clients.size);
      clearInterval(interval);
    });
  });
};
