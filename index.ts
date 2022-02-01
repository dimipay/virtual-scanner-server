import { Server, WebSocket } from "ws";

const server = new Server({ port: 3080 });
const sockets: WebSocket[] = [];

server.on("connection", (socket) => {
  socket.send("Connected :)");
  sockets.push(socket);

  socket.on("message", function (message: string) {
    console.log(message);
    sockets.forEach((s) => s.send(message));
  });
});
