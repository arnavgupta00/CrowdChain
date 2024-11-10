"use client";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "https://crowdchain.onrender.com/";

const socket = io(SOCKET_SERVER_URL);

export const getSocket = () => {
  return socket;
};



