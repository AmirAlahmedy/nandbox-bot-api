"use strict";
import NandBoxClient from "../src/NandBoxClient";
import NandBox from "../src/NandBox";
import User from "../src/data/User";


console.log("hey");

TOKEN = "90091783927225986:0:7Y6TXe7i9PDMSeXIvGw0SQAnmYRB0A";

client = new NandBoxClient().get();


// TODO: check new
nCallBack = new NandBox.Callback();

let api = new NandBox.Api();
api = null;

nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to server successfuly 
    console.log("Authenticated");
    api = _api;
}

// TODO: check incomingMsg type
nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");
    console.log(incomingMsg);
}

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {

}

nCallBack.onClose = () => {
    // TODO Auto-generated method stub

}

nCallBack.onError = () => {
    // TODO Auto-generated method stub

}

nCallBack.onChatMenuCallBack = chatMenuCallback => {
    // TODO Auto-generated method stub

}

nCallBack.onInlineMessageCallback = inlineMsgCallback => {
    // TODO Auto-generated method stub

}

nCallBack.onMessagAckCallback = msgAck => {
    // TODO Auto-generated method stub

}

nCallBack.onUserJoinedBot = user => {
    // TODO Auto-generated method stub

}

nCallBack.onChatMember = chatMember => {
    // TODO Auto-generated method stub

}

nCallBack.onChatAdministrators = chatAdministrators => {
    // TODO Auto-generated method stub

}

nCallBack.userStartedBot = user => {
    // TODO Auto-generated method stub

}

nCallBack.onMyProfile = user => {
    // TODO Auto-generated method stub

}

nCallBack.onUserDetails = user => {
    // TODO Auto-generated method stub

}

nCallBack.userStoppedBot = user => {
    // TODO Auto-generated method stub

}

nCallBack.userLeftBot = user => {
    // TODO Auto-generated method stub

}

nCallBack.permanentUrl = permenantUrl => {
    // TODO Auto-generated method stub

}

nCallBack.onChatDetails = chat => {
    // TODO Auto-generated method stub

}

nCallBack.onInlineSearh = inlineSearch => {
    // TODO Auto-generated method stub

}


client.connect(TOKEN, nCallBack);