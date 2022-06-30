const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const loggMessage = require("./logger/middleware");
//const res = require("express/lib/response");
const db = require("./database");

const roomModel = require("./models/room.model");
const userModel = require("./models/user.model"); //?
const messageModel = require("./models/user.model");

app.use(cors());

const port = 3001;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST", "DELETE"]
    },
});


io.use((socket, next)  => {
    socket.on("message", (data) => {
        const sendMess = {
           message:data.message,
           username:data.username,
           user_id:data.user_id,
           room_name:data.room_name,
           time:data.time
        }
        loggMessage(sendMess);
    });
    next();
});

io.on("connection", async (socket) => {
    const rooms = await roomModel.allRooms();
    const users = await userModel.allUsers();

    io.emit("connection", { rooms, users })

console.log(`${socket.id} is connected`);

socket.on("error", (errorMessage) => {
    io.emit("errorMessage", errorMessage);
});


socket.on("leave_room", (data) => {
    console.log(`${id} has left room ${data}`);
    socket.leave(data);
    

});

socket.on("message", async (data) => {
    if (!data.message.length) {
        return console.log("No message");
    }
    console.log(data);

    const sendMess = {
        message:data.message,
        username:data.username,
        user_id:data.user_id,
        room_name:data.room_name,
        time:data.time
        
    };

    messageModel.addMessage(sendMess);
    socket.emit("loggMessage", sendMess);

    const roomMessages = await messageModel.getRoom(data.room);
    console.log(roomMessages);
    io.emit("sent", roomMessages);
});


socket.on("createRoom", async (room_name) => {
    await roomModel.createRoom(room_name);
    socket.emit("roomCreated", {room_name});

    const create = await roomModel.allRooms();
    socket.emit("allRooms", create);
    console.log(create);

    socket.join(room_name);
    const roomMessages = await messageModel.getMessage(room_name);
    io.to(room_name).emit("sendMess", roomMessages);
    console.log(socket.rooms);
});


socket.on("joinRoom", async (room_name) => {

    const create = await roomModel.allRooms();
    socket.emit("allRooms", create);
    console.log(create);

    socket.join(room_name);
    const roomMessages = await messageModel.getMessages(room_name);
    io.to(room_name).emit("sentMessage", roomMessages);
    console.log(socket.rooms);

  
  });
  
  socket.on("deleteRoom", async (room_name) => {
    await roomModel.deleteRoom(room_name);

    await messageModel.deleteMessage(room_name);
    const updatedRooms = await roomModel.allRooms();
    io.emit("deleteRoom", updatedRooms);
  });
});


io.emit("new_client", "A user has joined");

io.on("disconnect", (reason) => {
    console.log(`${id} is disconnected because of ${reason}`);
    io.emit("message", "User has left the chat");
});


server.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
});