"use strict";
const Nand = require("../NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;
const NandBox = require("../NandBox");


const WhiteList = require("../data/WhiteList");

const TOKEN = "90091783927225986:0:DVi21J0RFyVv0zZrDMxkYbmN1V74x1"; // replace it with your token


const config = {
    URI: "wss://d1.nandbox.net:5020/nandbox/api/",
    DownloadServer: "https://d1.nandbox.net:5020/nandbox/download/",
    UploadServer: "https://d1.nandbox.net:5020/nandbox/upload/"
}
var client = NandBoxClient.get(config);



var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to the server successfuly 

    api = _api;
    console.log("Authenticated");

}



nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");

    if (incomingMsg.isTextMsg()) {
        let chatId = incomingMsg.chat.id; // get your chat Id
        let text = incomingMsg.text; // get your text message
        api.sendText(chatId, text); // Sending message back as an Echo
    }

}

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {
    console.log("received object: ", obj);
}

nCallBack.onClose = () => {}
nCallBack.onError = () => {}
nCallBack.onChatMenuCallBack = chatMenuCallback => {}
nCallBack.onInlineMessageCallback = inlineMsgCallback => {}
nCallBack.onMessagAckCallback = msgAck => {}
nCallBack.onUserJoinedBot = user => {}
nCallBack.onChatMember = chatMember => {}
nCallBack.onChatAdministrators = chatAdministrators => {}
nCallBack.userStartedBot = user => {}
nCallBack.onMyProfile = user => {}
nCallBack.onUserDetails = user => {}
nCallBack.userStoppedBot = user => {}
nCallBack.userLeftBot = user => {}
nCallBack.permanentUrl = permenantUrl => {}
nCallBack.onChatDetails = chat => {}
nCallBack.onInlineSearh = inlineSearch => {}
nCallBack.onBlackList = blackList => {}
nCallBack.onWhiteList = whiteList => {}

client.connect(TOKEN, nCallBack);