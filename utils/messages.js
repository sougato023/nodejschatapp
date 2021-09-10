const moment = require("moment");

// function formatMessages(username, text){
//     return {
//         username,
//         text,
//         time: moment().format("h:mm a")
//     }
// }

const formatMessages = (username, text) => {
 return {
    username,
    text,
    time: moment().format("h:mm a")
 };
};

exports.formatMessages = formatMessages;