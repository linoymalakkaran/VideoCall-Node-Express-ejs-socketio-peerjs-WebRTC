const express = require("express");
const app = express();
const server = require("http").createServer(app);
// const { ExpressPeerServer } = require('peer');
// const peerServerOptions = {
//   debug: true,
//   path: '/'
// }
// const peerServer = ExpressPeerServer(server, peerServerOptions);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");


app.set("view engine", "ejs");
app.use(express.static("public"));

// app.use((req, res, next) => {
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');
//   //res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
//   // const allowedOrigins = ['http://127.0.0.1:3001', 'http://localhost:3001',
//   //                         'http://127.0.0.1:3000', 'http://localhost:3000'];
//   // const origin = req.headers.origin;
//   // if (allowedOrigins.includes(origin)) {
//   //      res.setHeader('Access-Control-Allow-Origin', origin);
//   // }
//   // //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');
//   // res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   // res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

// app.get("/room", (req, res) => {
//   res.redirect(`/room/${uuidV4()}`);
// });

// app.get("/room/:room", (req, res) => {
//   res.render("room", { roomId: req.params.room });
// });

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

let port = process.env.PORT || '3000';
// app.use('/peerjs', function(req, res, next){
//   console.log(req.url);
//   return next();
// });
//app.use('/peerjs', peerServer);

server.listen(port,()=>{
  console.log(`App running in url: http://localhost:${port}/`);
});

