// console.log("radhe radhe")

const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const {Server} = require("socket.io")
const port = 3000;

const server = http.createServer(app);
const io = new Server(server)
app.use(express.static(path.resolve("./public")))

io.on('connection',(socket)=>{
    console.log("A new user has connected",socket.id)
})

app.get('/',(req,res)=>{
    // res.send("jai shree krishna")
    res.sendFile("/public/index.html");
})

app.listen(port,()=>{
    console.log(`app is listening at port: ${port}`)
});