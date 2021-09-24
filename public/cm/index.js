const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');
const projectTitle = document.querySelector('.chat-area-title');
const mode = 'vendor';
const mainProfile = document.querySelector('.user-profile');

// const SpeechRecognition = webkitSpeechRecognition; 
// const recognition = new SpeechRecognition(); //new SpeechRecognition object
// recognition.continuous = false; 
// recognition.lang = 'en-US';
// recognition.interimResults = false; 

const influencer_name = document.querySelector('.msg-username');
const influ_profile_pic = document.querySelector('.msg-profile');
const influ_profile_right_side_name = document.querySelector('.detail-title');
const influ_profile_right_side_pic = document.querySelector('.right-side-influencer-pic');
const initiatedDate = document.querySelector('.detail-subtitle');
const participants = document.querySelectorAll('.chat-area-profile');
const main_chat_area = document.querySelector('.chat-area-main');
const entry_point = document.querySelector('.entry-point');
const chat_search_input = document.querySelector('.chat-search');
const message_content = document.querySelectorAll('.chat-msg-text');

console.log(Notification.permission);

colors.forEach(color => {
  color.addEventListener('click', (e) => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});

// toggleButton.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });

//add new message to chat
// entry_point.addEventListener('keypress', ()=>{
//     //socket.emit('typing', {projectName, profile})
// });


entry_point.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Enter key was hit
        let newMessage = Object.assign({}, { id: Date.now().toString(), date: moment().format("h:mm a"), text: "", owner: mode});
        //TO DO - sanitize that before entry
        newMessage.text = entry_point.value;
        displayNewMessage(newMessage);
        entry_point.value = '';
    }
});

function textFind(keyword) {
    if(keyword) {

        $(".chat-msg-text").each(( index, element) => {
            var content = $(element).text();
            var searchText = new RegExp(keyword, "ig");
            var matches = content.match(searchText);       
      
            if(matches) {
                $(element).html(content.replace(searchText, function(match){
                return "<span class='highlight'>"+match+"</span>";
              }));
            }else {
              $('.highlight').removeClass('highlight');
            }
        });
  
    }else{
      $('.highlight').removeClass('highlight');
    }
}


chat_search_input.addEventListener('keyup', () => {
    let tts = chat_search_input.value;
    //search main chat area per letter
    tts = tts.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // let pattern = new RegExp(`${ tts }`,"gi");

    // let res = main_chat_area.innerHTML.toString().search(tts);
    // console.log(res);
    textFind(tts);
});

window.addEventListener('message', (message)=>{

    console.log(message.origin);
    //collect chat data from message vendor_id:influencer_id
    console.log(message.data);
    const id  = message.data;
    axios.get(window.location.origin+"/rcd?id="+id)
    .then(data => renderApp(data.data));
})

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const headers = {
    'Content-Type': 'application/json',
    }

    return axios.post(url, data, {
        'Access-Control-Allow-Origin': '*',
        headers: headers
    })
}

const renderApp = (data) => {
    let { projectName, vendor, influencer} = data;

    const usersImages = [vendor.image, influencer.image];
    localStorage.setItem('usersImages', usersImages);
    getPrevMessages(vendor.id,influencer.id)
    .then( res => loadPrevMessages(res, usersImages));
    projectTitle.innerHTML = `Project: ${projectName}`;
    mainProfile.setAttribute('src', vendor.image);
    //console.log(usersImages);
    influ_profile_right_side_name.innerHTML = influencer.name;
    influencer_name.innerHTML  = influencer.name;//latest influencer -Active
    influ_profile_pic.setAttribute('src', influencer.image);
    influ_profile_right_side_pic.setAttribute('src', influencer.image);
    initiatedDate.innerHTML = `Chat initiated on ${ moment("20210804").format("MMM Do YYYY") }`;//save on db and return with encrypted data (d-m-YYYY)
    // let influencers = getInfluencers();// arranged by last added. this FILO stack
    //     let influencers = [{
    //         name: "Abraham Olaobaju 2"
    //     },{
    //         name: "Sabastine Nwanchuku"
    //     }]
    // influencers.forEach(influencer => {
    //     influencer_names.innerHTML = influencer.name;
    // });

    var imagesLength = usersImages.length;
    participants.forEach(participant => {
        imagesLength--;
        participant.setAttribute('src', usersImages[imagesLength]);
        //console.log(participant.getAttribute('src'));  
        let isParticipating = (participant.getAttribute('src') == "undefined")? true :false;
        if(isParticipating){
            if(typeof(participant) !== undefined){
                participant.remove();
            }
        }
    });
}


const getPrevMessages = async ({ vendor_id, influencer_id}) => {
    let goody = {
        id: "77hvft65rf5yt6y7yh8ijyg66rf55",
        messages: [
        {
            owner: "vendor",
            textData: "Hi There. Just to confirm how may followers do you have again",
            date: moment().format("h:mm a")
        },
        {
            owner: "vendor",
            textData: "I was unable to load you instagram page. send me a link to your profile.",
            date: moment().format("h:mm a")
        },
        {
            owner: "influencer",
            textData: "Hi Boss",
            date: moment().format("h:mm a")
        },
        {
            owner: "influencer",
            textData: "Sure thing here it is - https://google.com",
            date: moment().format("h:mm a")
        }
    
    ],
    }
    let response = await Object.assign({}, goody );

    return response;
}


const loadPrevMessages = (res, usersImages) => { 

    const { id, messages} = res;  
    let  frontEnd = 'oops';
    main_chat_area.innerHTML = ( messages.length === 0)? '<p> No messages found </p>' : '';
    const helper = {
        urlify: (text) => {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
              return '<a href="' + url + '">' + url + '</a>';
            })
            // or alternatively
            // return text.replace(urlRegex, '<a href="$1">$1</a>')
        },
        notify: (message) => {
            return new Notification('New Vicomma message', message);
        },
        search: (q) => {
            let text = main_chat_area.textContent;
            let i = text.search(q);
            console.log(q);
        }
    }
    messages.forEach(message => {
        //who send this message
        const { urlify, notify } = helper;
        let actor = (message.owner == "vendor")? 0:1;
        let sentBy = (message.owner == "vendor")? 'owner': '';
        let Div = document.createElement("div");
        Div.innerHTML = `<div class="chat-msg ${ sentBy }">
        <div class="chat-msg-profile">
         <img class="chat-msg-img" src="${ usersImages[actor] }" alt="" />
         <div class="chat-msg-date">${ message.date }</div>
        </div>
        <div class="chat-msg-content">
         <div class="chat-msg-text">${ urlify(message.textData) }</div>
        </div>
       </div>`;
       main_chat_area.appendChild(Div);

    });

}

const displayNewMessage = ({ id, date, text, owner}) => {
    const helper = {
        urlify: (text) => {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
              return '<a href="' + url + '">' + url + '</a>';
            })
            // or alternatively
            // return text.replace(urlRegex, '<a href="$1">$1</a>')
        },
        notify: (message) => {
            return new Notification('New Vicomma message', message);
        },
        search: (q) => {
            let text = main_chat_area.textContent;
            let i = text.search(q);
            console.log(q);
        }
    }
    const { urlify } = helper;
    let usersImages = localStorage.usersImages.split(",");
    let actor = (owner == "vendor")? 0:1;
    let sentBy = (owner == "vendor")? 'owner': '';
    let dateCreated = moment().format("h:mm a");
    let Div = document.createElement("div");
    Div.innerHTML = `<div id="${ id }" class="chat-msg ${ sentBy }">
    <div class="chat-msg-profile">
     <img class="chat-msg-img" src="${ usersImages[actor] }" alt="" />
     <div class="chat-msg-date">${ dateCreated }</div>
    </div>
    <div class="chat-msg-content">
     <div class="chat-msg-text">${ urlify( text ) }</div>
    </div>
   </div>`;
   main_chat_area.appendChild(Div);
   //saveNewMessages({ id , dateCreated, text, owner});
}

const saveNewMessages = async ({ id, dateCreated, text, owner}) => {

    let payload = {
        id,
        date: dateCreated,
        message: text,
        actor: owner
    }

    //make a call th
    let response = await {};
    
    return response;
}


const addAttach = () => {
    let file = Object.assign({}, {name})
    return file;
}

const removeElement = (element) => {
    //add Disappear
    return element.classList('disappear-element');
}

// recognition.onstart = function() {
//     console.log("Speak into the microphone");
// };

// recognition.onspeechend = function() {
//     // when user is done speaking
//     recognition.stop();
// }

// // This runs when the speech recognition service returns result
// recognition.onresult = function(event) {
//     var transcript = event.results[0][0].transcript;
//     var confidence = event.results[0][0].confidence;
// };

// // start recognition
// recognition.start();