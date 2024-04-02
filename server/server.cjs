const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("User " + socket.id + " connected");
  socket.join("default");

  socket.on("send", (data, room) => {
    socket.to(room).emit("receive", data);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

io.on("disconnect", (socket) => {
  console.log("User " + socket.id + " disconnected");
});
