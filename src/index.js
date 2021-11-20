// import React from "react";
// import ReactDOM from "react-dom";
// import App from "../src/App";

// var element = document.getElementById("vicomma-chat");
// if (typeof element !== "undefined" && element !== null) {
//   ReactDOM.render(<App />, document.getElementById("vicomma-chat"));
// }

const PORT = process.env.PORT || 3000;

document.querySelector('input[name = "vport"]').value = `${PORT}`;
