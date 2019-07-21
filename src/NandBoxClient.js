"use strict";
import NandBox from "./NandBox";
import User from "./data/User";
import OutMessage from "./outmessages/OutMessage";
import TexOutMessage from "./outmessages/TextOutMessage";
import TextOutMessage from "./outmessages/TextOutMessage";
import { uniqueId, Id } from "./util/Utility";
import IncomingMessage from "./inmessages/IncomingMessage";
import MessageAck from "./inmessages/MessageAck";
import "@babel/polyfill";
import fs from "fs";

var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var nandboxClient = null;
var connection = null;
var BOT_ID = null;
var closingCounter = 0;
var timeOutCounter = 0;
var connRefusedCounter = 0;
var ping = null;

var getConfigs = () => {
    try {
    let CONFIG_FILE = require('../public/config.json');
    return CONFIG_FILE;
    } catch (error) {
        // TODO: handle config error
        console.log("config error");
    }
}

export default class NandBoxClient {

    static uri = getConfigs().URI;  

    constructor() {
        connection = new WebSocket(NandBoxClient.uri);
    }

    maxTextMessageSize = 1e5; // TODO: check usefulness
    InternalWebSocket = class InternalWebSocket {

        NO_OF_RETRIES_IF_CONN_TO_SERVER_REFUSED = 20;
        NO_OF_RETRIES_IF_CONN_TIMEDOUT = 10;
        NO_OF_RETRIES_IF_CONN_CLOSED = 10;

        tNandBox = new NandBox();
        callback = this.tNandBox.Callback;
        api = this.tNandBox.Api;

        token;
        authenticated = false;
        lastMessage = 0;
        sending = false;


        constructor(token, callback) {
            this.token = token;
            this.callback = callback;
            this.connect();
        }

        connect = () => {


            // Equivalent to onClose in the Java version
            connection.onclose = async status => {
                console.log("INTERNAL: ONCLOSE");
                console.log("StatusCode = " + status.code);
                console.log("Reason : " + status.reason);

                let current_datetime = new Date();
                let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" +
                current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" +
                current_datetime.getSeconds();
        
                console.log(formatted_date);

                this.authenticated = false;

                // TODO: pingpong here
                clearInterval(ping);

                this.callback.onClose();

                if ((status.code == 1000 || status.code == 1006 || status.code == 1001 || status.code == 1005)
                    && closingCounter < this.NO_OF_RETRIES_IF_CONN_CLOSED) {
                    try {

                        console.log("Please wait 10 seconds for Reconnecting ");
                        await sleep(10000);

                        closingCounter++;
                        console.log("Conenction Closing counter is: " + closingCounter);

                    } catch (e1) {
                        console.log(e1);
                    }

                    this.stopWebSocketClient();
                    try {
                        this.reconnectWebSocketClient();
                    } catch (e) {
                        console.log(e);
                    }

                } else {
                    console.log("End nandbox client");
                    // TODO: equivalent in JS?
                    // System.exit(0)

                }

            };

            // Equivalent to onConnect in the Java version
            connection.onopen = () => {

                //connection = connection;
                console.log("INTERNAL: ONCONNECT");
                // connection.send("connection established");

                let authObject = {};
                authObject.method = "TOKEN_AUTH";
                authObject.token = this.token;
                authObject.rem = true;


                this.api.send = message => {

                    console.log(new Date() + ">>>>>> Sending Message :", message);
                    this.send(message);
                }

                this.api.prepareOutMessage = (message, chatId, reference,
                    replyToMessageId, toUserId, webPagePreview, disableNotification,
                    caption, chatSettings) => {

                    message.chat_id = chatId;
                    message.reference = reference;

                    if (toUserId)
                        message.toUSerID = toUserId;
                    if (replyToMessageId)
                        message.replyToMessageId = replyToMessageId;
                    if (webPagePreview)
                        message.webPagePreview = webPagePreview;
                    if (disableNotification)
                        message.disableNotification = disableNotification;
                    if (caption)
                        message.caption = caption;
                    if (chatSettings)
                        message.chatSettings = chatSettings;

                }

                this.api.sendText = (chatId, text, reference, replyToMessageId, toUserId, webPagePreview, disableNotification,
                    chatSettings, bgColor) => {
                    if (chatId && text && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification &&
                        !chatSettings && !bgColor) {

                        const reference = Id();

                        this.api.sendText(chatId, text, reference, null, null, null, null, null, null);
                        return reference;

                    }
                    else if (chatId && text && reference && !bgColor && !replyToMessageId && !toUserId && !webPagePreview &&
                        !disableNotification && !chatSettings) {
                        let message = new TextOutMessage();
                        this.api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, null, chatSettings);
                        message.method = "sendMessage";
                        message.text = text;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                    else if (chatId && text && reference && bgColor && !replyToMessageId && !toUserId && !webPagePreview &&
                        !disableNotification && !chatSettings) {

                    } else {
                        /*  let message = new TextOutMessage();
                         this.api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                             disableNotification, null, chatSettings);
                         message.method = "sendMessage";
                         message.text = text;
                         message.reference = reference;
                         this.api.send(JSON.stringify(message)); */
                    }

                }

                this.api.sendTextWithBackground = (chatId, text, bgcolor) => {
                    let reference = utility.getUniqueID();
                    api.sendText(chatId, text, reference, null, null, null, null, null, bgColor);
                    return reference;
                }



                let strAuthObj = JSON.stringify(authObject);
                console.log(strAuthObj);
                this.send(strAuthObj);
            }

            // Equivalent to onError inn the Java version
            connection.onerror = error => { console.log("ONERROR: " + error); }

            // Equivalent to onUpdate inn the Java version
            connection.onmessage = msg => {
                let user = new User();
                this.lastMessage = (new Date()).getUTCMilliseconds();
                console.log("INTERNAL: ONMESSAGE");
                let obj = msg.data;
                console.log(new Date() + " >>>>>>>>> Update Obj : ", obj);
                obj = JSON.parse(obj);
                let method = obj.method;
                console.log(obj);
                if (method) {
                    console.log("method: " + method);
                    switch (method) {
                        case "TOKEN_AUTH_OK":
                            console.log("authentocated!");
                            this.authenticated = true;
                            BOT_ID = obj.ID;
                            console.log("====> Your Bot Id is : " + BOT_ID);
                            console.log("====> Your Bot Name is : " + obj.name);

                            //TODO: check pingpong here
                            this.pingpong(this.lastMessage);
                            this.callback.onConnect(this.api);

                            return;
                        case "message":
                            let incomingMessage = new IncomingMessage(obj);
                            this.callback.onReceive(incomingMessage);
                            return;
                        case "chatMenuCallback":
                            // TODO: write class
                            let chatMenuCallback = new ChatMenuCallback(obj);
                            this.callback.onChatMenuCallBack(chatMenuCallback);
                            return;
                        case "inlineMessageCallback":
                            // TODO: write class
                            let inlineMsgCallback = new InlineMessageCallback(obj);
                            this.callback.onInlineMessageCallback(inlineMsgCallback);
                            return;
                        case "inlineSearch":
                            // TODO: write class
                            let inlineSearch = new InlineSearch(obj);
                            this.callback.onInlineSearh(inlineSearch);
                            return;
                        case "messageAck":
                            let msgAck = new MessageAck(obj);
                            this.callback.onMessagAckCallback(msgAck);
                            return;
                        case "userJoinedBot":
                            let user = new User(obj.KEY_USER);
                            this.callback.onUserJoinedBot(user);
                            return;
                        case "chatMember":
                            // TODO: write class
                            let chatMember = new ChatMember(obj);
                            this.callback.onChatMember(chatMember);
                            return;
                        case "myProfile":
                            user = new User(obj.KEY_USER);
                            this.callback.onMyProfile(user);
                            return;
                        case "userDetails":
                            user = new User(obj.KEY_USER);
                            this.callback.onUserDetails(user);
                            return;
                        case "chatDetails":
                            let chat = new Chat(obj.KEY_CHAT);
                            this.callback.onChatDetails(chat);
                            return;
                        case "chatAdministrators":
                            // TODO: write class
                            let chatAdministrators = new ChatAdministrators(obj);
                            this.callback.onChatAdministrators(chatAdministrators);
                            return;
                        case "userStartedBot":
                            user = new User(obj.KEY_USER);
                            this.callback.userStartedBot(user);
                            return;
                        case "userStoppedBot":
                            user = new User(obj.KEY_USER);
                            this.callback.userStoppedBot(user);
                            return;
                        case "userLeftBot":
                            user = new User(obj.KEY_USER);
                            this.callback.userLeftBot(user);
                            return;
                        case "userLeftBot":
                            // TODO: write class
                            let permenantURL = new PermanentUrl(obj);
                            this.callback.permanentUrl(permenantURL);
                            return;
                        default:
                            this.callback.onReceiveObj(obj);
                            return;
                    }
                } else {
                    let error = obj.error;
                    console.log("Error: " + error);
                }

            }

        }

        pingpong = lastMessage => {

            if (!connection) return;
            if (connection.readyState !== 1) return;

            let currentTimeMs = (new Date()).getUTCMilliseconds();
            let interval = currentTimeMs - lastMessage;
            let obj = {};


            ping = setInterval(() => {
                obj.method = "PING";
                connection.send(JSON.stringify(obj));

            }, 30000);


        }

        reconnectWebSocketClient = () => {
            console.log("Creating new webSocketClient");
            connection = new WebSocket(NandBoxClient.uri);
            console.log("webSocketClient started");
            console.log("Getting NandboxClient Instance");
            nandboxClient = NandBoxClient.get();
            console.log("Calling NandboxClient connect");
            nandboxClient.connect(this.token, this.callback);
        }

        send = s => {
            try {
                if (connection)
                    connection.send(s);

            }
            catch (e) {
                console.log(e);
            }
        }

        stopWebSocketClient = () => {
            console.log("Stopping Websocket");
            try {
                if (this)
                    connection.close();
            }
            catch (e) {
                console.log("Exception: " + e + " while closing websocket");
            }
        }

    }

    static get = () => {
        if (nandboxClient == null)
            nandboxClient = init();
        return nandboxClient;
    }

    connect = (token, callback) => {
        connection = new WebSocket(NandBoxClient.uri);
        new this.InternalWebSocket(token, callback);
    }

}


var init = () => {
    if (nandboxClient != null) return;
    nandboxClient = new NandBoxClient();
    return nandboxClient;
}


