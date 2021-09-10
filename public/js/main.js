const chatform = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const leaveButton = document.querySelector("#leave-btn");

// get the query parameters
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const socket = io();


outputRoom(room);
//console.log(username, room);

socket.emit("joinRoom", {username, room});


//message form server
socket.on("message", data => {
   // console.log(data);
    outputMessage(data);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//roomusers from server
socket.on("roomUsers", data => {
   // console.log(data);
   outputUsers(data.users)
});

chatform.addEventListener("submit", (e) => {
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value;

    //console.log(msg);

    //emit a message to the server
    socket.emit("chatMessage", msg);

    //clear the input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// leaveButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     //socket.disconnect();
// });
//output message to dom
function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;

    document.querySelector(".chat-messages").appendChild(div);
}

//output room to dom
function outputRoom(room){
    const roomName = document.querySelector("#room-name");
    roomName.innerHTML = room;
}

function outputUsers(users){
   // console.log(users);
    const usersList = document.querySelector("#users");
    

    usersList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
    
}