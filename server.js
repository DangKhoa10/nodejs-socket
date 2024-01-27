const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:4200"], // Remove '/room-chat' from the origin
    methods: ["GET", "POST"],
  },
});


const port = 9000;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (message) => {
    console.log(message);
    console.log(socket.id);
    io.emit("message", `${message}`);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
