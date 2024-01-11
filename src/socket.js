import { Server } from "socket.io";
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  //
  io.on("connection", (socket) => {
    console.log("A user connected");

    //
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export const getIoInstance = () => {
  if (!io) {
    throw new Error("Io not Initialized");
  }
  return io;
};
