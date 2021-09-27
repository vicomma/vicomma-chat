const events = require("events");

const initateChat = new events.EventEmitter();
const newMessage = new events.EventEmitter();

module.exports = {
    initateChat,
    newMessage
};
