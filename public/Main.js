"use strict";
import NandBoxClient from "../src/NandBoxClient";
import { Api, Callback } from "../src/NandBox";
import User from "../src/data/User";


TOKEN = "90091905646805157:0:OxOIQggTh93AZWpP9wArWgBbjWJgZD";

client = new NandBoxClient();
client = NandBoxClient.get();

// TODO: check new
nCallBack = new Callback();
client.connect(TOKEN, nCallBack = () => {
    let api = new Api();
    api = null;

    onConnect = (_api) => {
        // it will go here if the bot connected to server successfuly 
        console.log("Authenticated");
        api = _api;

    }

    // TODO: check incomingMsg type
    onReceive = incomingMsg => {
        console.log("Message Received");
    }

    // implement other nandbox.Callback() as per your bot need
    onReceiveObj = obj => {

    }

    onClose = () => {
        // TODO Auto-generated method stub

    }

    onError = () => {
        // TODO Auto-generated method stub

    }

    onChatMenuCallBack = chatMenuCallback => {
        // TODO Auto-generated method stub

    }

    onInlineMessageCallback = inlineMsgCallback => {
        // TODO Auto-generated method stub

    }

    onMessagAckCallback = msgAck => {
        // TODO Auto-generated method stub

    }

    onUserJoinedBot = user => {
        // TODO Auto-generated method stub

    }

    onChatMember = chatMember => {
        // TODO Auto-generated method stub

    }

    onChatAdministrators = chatAdministrators => {
        // TODO Auto-generated method stub

    }

    userStartedBot = user => {
        // TODO Auto-generated method stub

    }

    onMyProfile = user => {
        // TODO Auto-generated method stub

    }

    onUserDetails = user => {
        // TODO Auto-generated method stub

    }

    userStoppedBot = user => {
        // TODO Auto-generated method stub

    }

    userLeftBot = user => {
        // TODO Auto-generated method stub

    }

    permanentUrl = permenantUrl => {
        // TODO Auto-generated method stub

    }

    onChatDetails = chat => {
        // TODO Auto-generated method stub

    }

    onInlineSearh = inlineSearch => {
        // TODO Auto-generated method stub

    }

});