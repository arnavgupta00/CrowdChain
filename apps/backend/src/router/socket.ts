interface BroadcastMessage {
  sessionId: string;
  trackNameAudio: string | undefined;
  trackNameVideo: string | undefined;
}

// Structure to hold room data
interface RoomData {
  roomName: string;
  message: BroadcastMessage;
}

const rooms: RoomData[] = [];
import { Socket } from "socket.io";

export const socket = (io: any) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New user connected: ${socket.id}`);

    // Join room logic
    socket.on("joinRoom", (roomName: string) => {
      socket.join(roomName);
      console.log(`${socket.id} joined room: ${roomName}`);

      const messageToPass = rooms.find((r) => r.roomName === roomName);

      socket.emit("broadcastMessage", messageToPass);
    });

    // Listen for broadcasting object messages
    socket.on(
      "broadcastObjectMessage",
      (roomName: string, objectToPassInSocket: BroadcastMessage) => {
        // Add the object to the corresponding room's messages
        const room = rooms.find((r) => r.roomName === roomName);
        if (room) {
          room.message = objectToPassInSocket;
        } else {
          // Create the room if it doesn't exist
          rooms.push({
            roomName,
            message: objectToPassInSocket,
          });
        }

        // Broadcast to everyone in the room
        io.to(roomName).emit("broadcastMessage", objectToPassInSocket);
      }
    );

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
