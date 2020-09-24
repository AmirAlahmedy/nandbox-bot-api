"use strict";
const NandBox = require("./src/NandBox");
const Nand = require("./src/NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;
const Logger = require('./src/util/Logger');

const TOKEN = "90091903321704167:0:p48ih4IYx70dMvSH7rqYsPTY71sR7n";
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
    // it will go here if the bot connected to the server successfuly 
    api = _api;
    console.log("Authenticated");
    Logger.logger.info("Authenticated");
}


nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");
    Logger.logger.info("Message Received");

    if (incomingMsg.isTextMsg()) {
        let chatId = incomingMsg.chat.id; // get your chat Id
        let text = incomingMsg.text; // get your text message
        api.sendText(chatId, text); // Sending message back as an Echo
    }

}

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {
    console.log("received object: ", obj);
    Logger.logger.info("received object: " + obj);
}

nCallBack.onClose = () => {
    console.log("ONCLOSE");
    Logger.logger.info("ONCLOSE");
}
nCallBack.onError = () => {
    console.log("ONERROR");   
    Logger.logger.error("ONERROR");   
}
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

client.connect(TOKEN, nCallBack);