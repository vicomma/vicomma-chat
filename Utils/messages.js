const moment = require("moment");

function formatMessage(actor, text) {
  return {
    id: Date.now().toString(),
    owner: actor,
    text,
    date: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
