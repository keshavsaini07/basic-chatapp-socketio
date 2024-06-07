const express = require("express");
const http = require('http');
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3003;

app.use('/', express.static(__dirname + "/public"))

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html")
// })

io.on('connection', (socket) => {
  // socket object will be used to do the task inside any connection
  console.log("user has connected", socket.id)
  // it also breaks the connection while refreshing, and its becasue you are manually breaking the connection pipeline
  // socket.on('disconnect', () => {
  //   console.log("user disconnected", socket.id)
  // })
  
  // socket.on("from client", () => {
  //   console.log("Recived the event message from client");
  // }) 

  socket.on("new message", (data) => {
    io.emit("msg recieved", data);  
    // socket.emit("msg recieved", data);  
    // socket.broadcast.emit("msg recieved", data);  
  })

  // sockets are all based on events, whenever a client connects or disconnects its all happening based on events, you can sent manual events from client and server both
  setInterval(function f(){
    socket.emit("from server")
  }, 3000)
})

server.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
