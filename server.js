
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");


const dotenv = require("dotenv");
const { formatMessages } = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "NodeJs Chat Bot";
//set static folder
app.use(express.static(path.join(__dirname,"public")));

//Run when a client connects
io.on("connect", (socket) => {
   // console.log(`New web socket connection ....`);

    //socket.emit("message", "Welcome to NodeJs chat!!");

    socket.on("joinRoom", ({username, room}) => {
        //console.log(username);
        const user = userJoin(socket.id, username, room);

       socket.join(user.room);
        
        socket.emit("message", formatMessages(botName, "Welcome to NodeJs chat!!"));

        //Broadcast when a user joins: except the client who is joining
        //socket.broadcast.emit("message", formatMessages(botName, "A user has joined the chat"));
        socket.broadcast
        .to(user.room)
        .emit("message", formatMessages(botName, `A user has joined the chat room: ${user.room}`));

        //send user and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });

    // socket.emit("message", formatMessages(botName, "Welcome to NodeJs chat!!"));

    // //Broadcast when a user joins: except the client who is joining
    // socket.broadcast.emit("message", formatMessages(botName, "A user has joined the chat"));

    //Broadcast when a user joins to all clients
    //io.emit()

   

    //Listen for chat message
    socket.on("chatMessage", msg => {
        const user = getCurrentUser(socket.id);
        //console.log(`Current user: ${user}`);
        
        io.to(user.room).emit("message", formatMessages(user.username, msg));
        //console.log(msg);
    });

     //when the user disconnets
     socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        //console.log(`Disconnect: ${user.username}`);
        //send user and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        if(user){
            io.to(user.room).emit("message",formatMessages(botName, `A user: ${user.username} has left the room: ${user.room}`))
        }
        
    });

});


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});