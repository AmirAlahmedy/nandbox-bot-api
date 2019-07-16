"use strict";
import NandBoxClient from "../src/NandBoxClient";
import NandBox from "../src/NandBox";
import User from "../src/data/User";


const TOKEN = "90091783927225986:0:5wM5LJHJDvr42z2JnHItVGDLeMcPPY";


var client = (new NandBoxClient()).get();


// TODO: check new
var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to server successfuly 
    _api = nandbox.Api;
    api = _api;
    console.log("Authenticated");
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