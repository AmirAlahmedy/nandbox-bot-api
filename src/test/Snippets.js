const NandBox = require("../NandBox");
const Nand = require("../NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;
const TextOutMessage = require("../outmessages/TextOutMessage");
const Utils = require("../util/Utility");
const Id = Utils.Id;
const Utility = Utils.Utility;
const OutMessage = require("../outmessages/OutMessage");
const Menu = require("../data/Menu");
const Row = require("../data/Row");
const SetChatMenuOutMessage = require("../outmessages/setChatMenuOutMessage");
const DocumentOutMessage = require("../outmessages/DocumentOutMessage");
const MediaTransfer = require("../util/MediaTransfer");
const ContactOutMessage = require("../outmessages/ContactOutMessage");
const LocationOutMessage = require("../outmessages/LocationOutMessage");
const GifOutMessage = require("../outmessages/GifOutMessage");
const AudioOutMessage = require("../outmessages/AudioOutMessage");
const VideoOutMessage = require("../outmessages/VideoOutMessage");
const PhotoOutMessage = require("../outmessages/PhotoOutMessage");
const Button = require("../data/Button");
const Data = require('../data/Data');
const WhiteListUser = require('../data/WhiteListUser');
const BlackList = require('../inmessages/BlackList');
let TOKEN = "90091903321704167:0:hLgEbY39KztnOqAjiKGYqq4UGbyA0F"; // you can put your own bot token
const config = {
    URI: "wss://w1.nandbox.net:5020/nandbox/api/",
    DownloadServer: "https://w1.nandbox.net:5020/nandbox/download/",
    UploadServer: "https://w1.nandbox.net:5020/nandbox/upload/"
}
var client = NandBoxClient.get(config);

var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    api = _api;
    console.log("Authenticated");

}

nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");
    if (incomingMsg.isTextMsg()) {
        if(incomingMsg.text.toLowerCase() == "photo"){
            MediaTransfer.uploadFile(TOKEN, "./upload/welcome.jpg", config.UploadServer)
                .then((uploadedPhotoId) => {
                    let photoMsg = new PhotoOutMessage();
                    photoMsg.chat_id = incomingMsg.chat.id;
                    photoMsg.reference = Id();
                    photoMsg.photo = uploadedPhotoId;
                    photoMsg.caption = "Photo From Bot";
                    photoMsg.echo = 1;

                    api.send(JSON.stringify(photoMsg));
                })
                .catch((e) => console.log("Upload failed", e));

        }else if(incomingMsg.text.toLowerCase() == "video"){
            MediaTransfer.uploadFile(TOKEN, "./upload/recallTest.mp4", config.UploadServer)
                .then((uploadedVideoId) => {
                    let vidoMsg = new VideoOutMessage();
                    vidoMsg.chat_id = incomingMsg.chat.id;
                    vidoMsg.reference = Id();
                    vidoMsg.video = uploadedVideoId;
                    vidoMsg.caption = "Video From Bot";
                    vidoMsg.echo = 0;

                    api.send(JSON.stringify(vidoMsg));
                })
                .catch((e) => console.log("Upload failed", e));

        }else if(incomingMsg.text.toLowerCase() == "audio"){
            MediaTransfer.uploadFile(TOKEN, "./upload/Unstoppable.mp3", config.UploadServer).then(
                (uploadedAudioId) => {
                  let audioOutMsg = new AudioOutMessage();
                  audioOutMsg.chat_id = incomingMsg.chat.id;
                  audioOutMsg.reference = Id();
                  audioOutMsg.audio = uploadedAudioId;
                  audioOutMsg.performer = "Perfomer Man";
                  audioOutMsg.title = " Song";
                  audioOutMsg.caption = "Audio From Bot";
              
                  api.send(JSON.stringify(audioOutMsg));
                }
              );
              
        }else if(incomingMsg.text.toLowerCase() == "document"){
            MediaTransfer.uploadFile(
                TOKEN,
                "./upload/malala.pdf",
                config.UploadServer
              ).then((uploadedDocumentId) => {
                let documentOutMsg = new DocumentOutMessage();
                documentOutMsg.chat_id = incomingMsg.chat.id;
                documentOutMsg.reference = Id();
                documentOutMsg.document = uploadedDocumentId;
                documentOutMsg.name = "Document renamed inside Bot";
                documentOutMsg.caption = "Document From Bot";
              
                api.send(JSON.stringify(documentOutMsg));
              });              
            
        }else if(incomingMsg.text.toLowerCase() == "gif"){
            MediaTransfer.uploadFile(TOKEN, "./upload/giphy.gif", config.UploadServer)
            .then(gifId => {
                let gifMsg = new GifOutMessage("Photo", gifId);
                gifMsg.chat_id = incomingMsg.chat.id;
                gifMsg.reference = Id();
                gifMsg.caption = "Haha!";
                gifMsg.echo = 0;

                api.send(JSON.stringify(gifMsg));
            })
        }else if(incomingMsg.text.toLowerCase() == "location"){
            let locationOutMsg = new LocationOutMessage();
            
            locationOutMsg.chat_id = incomingMsg.chat.id;
            locationOutMsg.reference = Id();
            locationOutMsg.name = "Cairo International Airport";
            locationOutMsg.details = "Cairo, Egypt";
            locationOutMsg.latitude = 30.102366;
            locationOutMsg.longitude = 31.426319;
            locationOutMsg.caption = "Cairo Airport Location From Bot";
            
            api.send(JSON.stringify(locationOutMsg));

        }else if(incomingMsg.text.toLowerCase() == "contact"){
        
            let contactOutMsg = new ContactOutMessage();
            contactOutMsg.chat_id = incomingMsg.chat.id;
            contactOutMsg.reference = Id;
            contactOutMsg.name = "KFC";
            contactOutMsg.phoneNumber = "19019";

            api.sendContact(incomingMsg.chat.id,
                contactOutMsg.phoneNumber,
                contactOutMsg.name);

        }else if(incomingMsg.text.toLowerCase() == "chatmenu"){
            
            let outmsg = new SetChatMenuOutMessage();

            let chat_id = incomingMsg.chat.id;

            Utility.setNavigationButton(chat_id, "mainMenu", api);

            let menuBtn1 = createButton("No Smoking", "mainCB", 1, "Gray", "Red", null, null);
            menuBtn1.button_icon = "ic_smoke_free_24dp";
            menuBtn1.button_icon_bgcolor = "#00FFFF";

            let buttons = [];
            buttons.push(menuBtn1);

            let rowOrder = 1;
            let firstRow = new Row(buttons, rowOrder);

            let rows = [];
            rows.push(firstRow);

            let menuRef = "mainMenu";
            let chatMenu = new Menu(rows, menuRef);
            let menus = [];
            menus.push(chatMenu);

            outmsg.chat_id = incomingMsg.chat.id;
            outmsg.menus = menus;

            api.send(JSON.stringify(outmsg));
        }
    }
}

nCallBack.onReceiveObj = obj => {
    console.log("received object: ", obj);
}

nCallBack.onClose = () => { }
nCallBack.onError = () => { }
nCallBack.onChatMenuCallBack = chatMenuCallback => { }
nCallBack.onInlineMessageCallback = inlineMsgCallback => { }
nCallBack.onMessagAckCallback = msgAck => { }
nCallBack.onUserJoinedBot = user => { }
nCallBack.onChatMember = chatMember => { }
nCallBack.onChatAdministrators = chatAdministrators => { }
nCallBack.userStartedBot = user => { }
nCallBack.onMyProfile = user => { }
nCallBack.onUserDetails = user => { }
nCallBack.userStoppedBot = user => { }
nCallBack.userLeftBot = user => { }
nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { }
nCallBack.onInlineSearh = inlineSearch => { }
nCallBack.onBlackList = blackList => { }
nCallBack.onWhiteList = whiteList => { }

client.connect(TOKEN, nCallBack);

let createButton = (label, callback, order, bgColor, txtColor, buttonQuery, nextMenuRef) => {

    let btn = new Button();

    btn.button_label = label;
    btn.button_order = order;
    btn.button_callback = callback;
    btn.button_bgcolor = bgColor;
    btn.button_textcolor = txtColor;
    btn.button_query = buttonQuery;
    btn.next_menu = nextMenuRef;

    return btn;
}