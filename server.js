const http = require('http');
const path = require('path');
const Redis = require("ioredis");
const express = require('express');
const app = express();
const server = http.createServer(app);
const redis = new Redis();
const cors = require('cors');
const CryptoJS = require("crypto-js");
const JSONCache = require('redis-json'); //save JSON objects
const encrytionKey = 'vc-8778944850-boom==';
const { google } = require('googleapis');
// const redis = new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   password: "auth",
//   db: 0,
// });
app.use(cors())
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.post('/register-chat', cors(corsOptions) ,(req, res, next) => {

  const { vendor, projectName, influencer } = req.body;
  // console.log(influencer)
  const callback = (err, success) => {
    if(err){
      res.status(400);
      res.send({ message: "chat already exist" })
      console.error(err);
    }else{

      res.status(200);
      res.send({ message: "chat registered" })
      console.error(success);

    }

  }

//   redis.hset('chat:'+projectName,"participants",`${vendor.id}:${influencer.id}`,callback);
//   //register vendor and influencer
//   redis.hmset('vendor:'+vendor.id,{
//     'vendorName': vendor.name,
//     'chat_list': [
//       projectName
//     ],
//     'isActive': true
//   });

//   redis.hmset('influencer:'+influencer.id,{
//     'firstname': influencer.firstname,
//     'lastname': influencer.lastname,
//     'chat_list': [
//       projectName,
//     ],
//     'isActive': false
//   });


  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(req.body), encrytionKey).toString();
  let response = Object.assign({},req.body,{id: ciphertext})
  res.json(response);

});

app.get('/rcd', cors(corsOptions),(req, res, next) => {

    const { id } = req.query;

    //Decrypt
    let bytes  = CryptoJS.AES.decrypt(id, encrytionKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8); 
    res.json(JSON.parse(originalText));
});

app.get('/chat-info/:id/:type', (req, res ) => {
  const {id, type} = req.params;
  
  redis.hget(`${type}:${id}`,'chat_list', (err, data) => {

    console.log(data);
    if(err){
      res.status(400);
      res.send({ message: err })
    }
    res.status(200);
    res.send({ data })
  });

})

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require('./Utils/users');
const formatMessage = require('./Utils/messages');
const { getAllJobs } = require('./Utils/projects');

const io = require('socket.io')(server, {
    cors: {origin:'*'}
});

const botName = 'Vicommma';

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    // console.log('new connection');

    socket.on('initiateChat', ( { profile, projectName } ) => {

        if(profile.type == 'vendor'){
          console.log(`${ projectName } chat initiated by ${ profile.name }`);
        }else{
          console.log(` ${ profile.name } influencer joined ${ projectName } chat.`);
        }


        const user = userJoin(socket.id, profile, projectName);
        console.log(user);
        socket.join(user.projectName);
        
        // Broadcast when a user connects and is online;
        socket.broadcast
        .to(user.projectName)
        .emit(
          'message',
          formatMessage(botName, `${user.profile.name} is online to chat`)
        );

        
        io.to(projectName).emit('participants', profile)
        // socket.broadcast.to(projectName).emit('getParticipants', profile)
        //socket.broadcast.to(projectName).emit('participants', profile)

    });

    socket.on('updateparticipants', ( {projectName, participants} ) => {
      io.to(projectName).emit('activeParticipants', participants);
      console.log(participants);
    });

    //listening for typing
    socket.on('typing', data => {
      let { projectName, profile } = data;
      const user = getCurrentUser(profile);
      // console.log(user);
      socket.broadcast.to(projectName).emit('typing', { message: `${ profile.name} typing...`})
    })

    // // Send users and room info
    // io.to(user.projectName).emit('participants', {
    //     room: user.projectName,
    //     users: getRoomUsers(user.projectName),
    //     projects: getAllJobs(user.id)
    // });

    // Listen for chatMessage
    socket.on('chatMessage', chatLoad => {
      let { projectName, profile, msg } = chatLoad;
      // console.log(`${ profile.name }: ${ msg }`);
      const user = getCurrentUser(profile);
      io.to(projectName).emit('message', formatMessage(profile.name, msg));
    });

    //Runs when client disconnects
    socket.on('disconnect', (profile) => {
      console.log('disconnection');
      const user = userLeave(profile);
      socket.broadcast
      .to('SportBoots')
      .emit('message',
        formatMessage(botName, `${profile.id} is offline`)
      );
    });
})

server.listen(PORT, () => {
    console.log(`Socket Server running on PORT: ${ PORT }`);
});
