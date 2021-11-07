const http = require("http");
const path = require("path");
const { boolean } = require("boolean");
const Redis = require("ioredis");
const express = require("express");
const config = require("better-config");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const JSONCache = require("redis-json"); //save JSON objects
const encrytionKey =
  process.env.VICOMMA_ENCRYPTION_KEY || "vc-8778944850-boom==";
const { google } = require("googleapis");
config.set("config.json");
const redis = new Redis(
  process.env.REDIS_TLS_URL ||
    "redis://:p9643d7f730a717a3efbd9e2458bd72bd798134730748198da065c4332c9184cc@ec2-54-157-81-189.compute-1.amazonaws.com:12880",
  {
    tls: {
      rejectUnauthorized: false,
    },
  }
);
app.use(cors());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  registerChat,
  getChatMessages,
  isChatRegisted,
} = require("./Utils/chat");

const { encryptData, decryptData } = require("./Utils/encrypt");

const { initateChat, newMessage } = require("./Utils/events");
var corsOptions = {
  // origin: [
  //   "http://127.0.0.1:8000",
  //   "https://vicomma-stagingrevamp.herokuapp.com",
  //   "https://vicommadev-chat.herokuapp.com",
  // ],
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.post("/register-chat", cors({ origin: "*" }), async (req, res) => {
  const { vendor, projectName, influencer } = req.body;
  // console.log(influencer)
  let registration_status = false;

  //registration_status = boolean(await isChatRegisted({ vendor, influencer }));
  // console.log("hello mate");
  if (!registration_status) {
    initateChat.emit("saveDetails", { vendor, projectName, influencer }); // saveDetails eventHandler
  }
  // Encrypt
  let ciphertext = encryptData(req.body, encrytionKey);
  console.log(ciphertext);
  let response = Object.assign({}, req.body, {
    id: ciphertext,
    chat_status: registration_status,
  });
  res.json(response);
});

app.get("/rcd", cors(corsOptions), async (req, res) => {
  const { id } = req.query;
  //Decrypt
  let originalText = decryptData(id, encrytionKey);
  const { vendor, influencer } = JSON.parse(originalText);
  const { newid, messages } = await getChatMessages(
    `${vendor.id}:${influencer.id}`
  );
  let newdata = Object.assign({}, JSON.parse(originalText), {
    newid,
    messages,
  });
  res.json(newdata);
});

app.post("/um", cors(corsOptions), async (req, res) => {
  const { m, pair } = req.body; //will this come with already saved messages.
  let address = pair;
  const msgCache = new JSONCache(redis, { prefix: "messages:" });
  msgCache.set(address, m);
  m.forEach((message) => {});
});

app.get("/chat-info/:id/:type", (req, res) => {
  const { id, type } = req.params;

  redis.hget(`${type}:${id}`, "chat_list", (err, data) => {
    console.log(data);
    if (err) {
      res.status(400);
      res.send({ message: err });
    }
    res.status(200);
    res.send({ data });
  });
});

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./Utils/users");
const logger = require("./Utils/logger");
const formatMessage = require("./Utils/messages");
const { getAllJobs } = require("./Utils/projects");

initateChat.on("saveDetails", (load) => {
  console.log("final result : ", registerChat(load));
});

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const botName = "Vicommma";

const PORT = process.env.PORT || config.get("application.port");

io.on("connection", (socket) => {
  // console.log('new connection');

  socket.on("initiateChat", ({ profile, projectName }) => {
    if (profile.type == "vendor") {
      console.log(`${projectName} chat initiated by ${profile.name}`);
    } else {
      console.log(` ${profile.name} influencer joined ${projectName} chat.`);
    }

    const user = userJoin(socket.id, profile, projectName);
    console.log(user);
    socket.join(user.projectName);

    // Broadcast when a user connects and is online;
    socket.broadcast
      .to(user.projectName)
      .emit(
        "message",
        formatMessage(botName, `${user.profile.name} is online to chat`)
      );

    io.to(projectName).emit("participants", profile);
    // socket.broadcast.to(projectName).emit('getParticipants', profile)
    //socket.broadcast.to(projectName).emit('participants', profile)
  });

  socket.on("updateparticipants", ({ projectName, participants }) => {
    io.to(projectName).emit("activeParticipants", participants);
    console.log(participants);
  });

  //listening for typing
  socket.on("typing", (data) => {
    let { projectName, profile } = data;
    const user = getCurrentUser(profile);
    // console.log(user);
    socket.broadcast
      .to(projectName)
      .emit("typing", { message: `${profile.name} typing...` });
  });

  // // Send users and room info
  // io.to(user.projectName).emit('participants', {
  //     room: user.projectName,
  //     users: getRoomUsers(user.projectName),
  //     projects: getAllJobs(user.id)
  // });

  // Listen for chatMessage
  socket.on("chatMessage", (chatLoad) => {
    let { projectName, profile, msg } = chatLoad;
    // console.log(`${ profile.name }: ${ msg }`);
    const user = getCurrentUser(profile);
    io.to(projectName).emit("message", formatMessage(profile.name, msg));
  });

  //Runs when client disconnects
  socket.on("disconnect", (profile) => {
    console.log("disconnection");
    const user = userLeave(profile);
    socket.broadcast
      .to("SportBoots")
      .emit("message", formatMessage(botName, `${profile.id} is offline`));
  });
});

// Check for required environment variables.
if (process.env.VICOMMA_ENCRYPTION_KEY === undefined) {
  console.warn("Warning: Environment variable VICOMMA_ENCRYPTION_KEY not set!");
}

server.listen(PORT, () => {
  console.log(`Socket Server running on PORT: ${PORT}`);
});
