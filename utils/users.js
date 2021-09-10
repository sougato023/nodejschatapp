const users = [];

//join user to chat
const userJoin = (id, username, room) => {
    const user = {id, username, room};
    //console.log(window);
    users.push(user);

    return user;
}

const getCurrentUser = (id) => {
    const user = users.find( (user) => user.id === id);

    return user;
}

const userLeave = (id) => {
    //console.log(id);
    const index = users.findIndex(user => user.id === id);
 //console.log(index);
    if( index !== -1){
        //console.log(users.splice(index, 1)[0]);
        return (users.splice(index, 1)[0]);
    }
}

const getRoomUsers = room => {
    return users.filter(user => user.room === room);   
}

// exports.userJoin = userJoin;
// exports.getCurrentUser = getCurrentUser;
// exports.userLeave = userLeave;
// exports. getRoomUsers = getRoomUsers;

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}