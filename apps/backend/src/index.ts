import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import zkpRouter from "./router/zkpRouter";
import { socket } from "./router/socket";


const app = express();
const port = process.env.PORT || 5000;
const httpServer = createServer(app);

// Initialize Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Change this to your frontend's origin in production
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/zkp", zkpRouter);
socket(io);

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
