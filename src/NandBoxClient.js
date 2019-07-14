"use strict";
import { NandBox, callback, Api } from "./NandBox";
import User from "./data/User";
import OutMessage from "./outmessages/OutMessage";
import TexOutMessage from "./outmessages/TextOutMessage";
import TextOutMessage from "./outmessages/TextOutMessage";
import utility from "./util/Utility";

sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class NandBoxClient {

    static CONFIG_FILE = "./Public/config.json";
    static BOT_ID = null;
    static nandboxClient;
    webSocketClient;
    closingCounter = 0;
    timeOutCounter = 0;
    connRefusedCounter = 0;
    uri;
    KEY_METHOD = "method";
    KEY_ERROR = "error";


    getConfigs = () => {
        try {
            let configs = require(this.CONFIG_FILE);
            return configs;
        } catch (error) {
            // TODO: handle config error
        }

    }

    maxTextMessageSize = 1e5; // TODO: check usefulness
    InternalWebSocket = class InternalWebSocket {

        NO_OF_RETRIES_IF_CONN_TO_SERVER_REFUSED = 20;
        NO_OF_RETRIES_IF_CONN_TIMEDOUT = 10;
        NO_OF_RETRIES_IF_CONN_CLOSED = 10;
        KEY_USER = "user";
        KEY_CHAT = "chat";
        KEY_NAME = "name";
        KEY_ID = "ID";

        callback;
        session;
        token;
        api;
        authenticated = false;
        echo = false;
        lastMessage = 0;
        connection = null;

        constructor(token, callback) {
            if (!token && !callback) {
                this.connect();
            } else if (token && callback) {

                this.token = token;
                this.callback = callback;
            }
        }

        //TODO: check
        //uri = NandBoxClient.getConfigs();
        uri = "wss://w1.nandbox.net:5020/nandbox/api//nandbox/api/";

        connect = () => {
            // this.connection = new WebSocket(uri);
            this.connection.onclose = () => {

            };
            this.pingpong();
            this.connection.onopen = () => { console.log("connection opened"); }
            this.connection.onerror = error => { console.log(error); }
            this.connection.onmessage = msg => {
                let user;
                let lastMessage = (new Date()).getUTCMilliseconds();
                console.log("INTERNAL: ONMESSAGE");
                let obj = JSON.parse(msg);
                console.log(formatDate(new Date()) + " >>>>>>>>> Update Obj : " + obj);
            }
        }

        pingpong = () => {
            if (!this.connection) return;
            if (this.connection.readyState !== 1) return;
            this.connection.send("ping");
            setTimeout(this.pingpong, 30000);
        }

        pingThread = null;


        onClose = async (statusCode, reason) => {
            console.log("INTERNAL: ONCLOSE");
            console.log("StatusCode = " + statusCode);
            console.log("Reason : " + reason);

            let current_datetime = new Date();
            let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            console.log(formatted_date);

            authenticated = false;
            // TODO: implement an alternative to threading
            //    if(this.pingThread !== null){
            //        try{

            //        }catch(e){
            //            console.log(e);
            //        }
            //    }

            pingThread = null;
            callback.onClose();

            if ((statusCode == 1000 || statusCode == 1006 || statusCode == 1001 || statusCode == 1005)
                && closingCounter < NO_OF_RETRIES_IF_CONN_CLOSED) {
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

        }

        reconnectWebSocketClient = () => {
            console.log("Creating new webSocketClient");


            this.connection = new WebSocket(this.uri);

            console.log("webSocketClient started");
            console.log("Getting NandboxClient Instance");
            nandboxClient = NandBoxClient.get();
            console.log("Calling NandboxClient connect");
            nandboxClient.connect(token, callback);
        }

        send = s => {
            try {
                if (connection)
                    this.connection.send(s);

            }
            catch (e) {
                console.log(e);
            }
        }

        stopWebSocketClient = () => {
            console.log("Stopping Websocket");
            try {
                if (this)
                    this.connection.close();
            }
            catch (e) {
                console.log("Exception: " + e + " while closing websocket");
            }
        }

        onConnect = connection => {
            this.connection = connection;
            console.log("INTERNAL: ONCONNECT");

            let authObject = {};
            authObject.KEY_METHOD = "TOKEN_AUTH";
            authObject.token = this.token;
            authObject.rem = true;

            let api = new Api();

            //TODO: check
            api.send = message => {
                
                console.log(new Date() + ">>>>>> Sending Message :" + message);
                this.send(JSON.stringify(message))
            }

            api.prepareOutMessage = (message, chatId, reference,
                replyToMessageId, toUserId, webPagePreview, disableNotification,
                caption, chatSettings) => {

                message.chatId = chatId;
                message.reference = reference;

                if (toUSerID)
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
            // TODO: imlplement getUniqueID
            api.sendText = (chatId, text, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings, bgColor) => {
                if (chatId && text && !reference && replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings && !bgColor) {
                    let reference = utility.getUniqueID();
                    api.sendText(chatId, text, reference, null, null, null, null, null, null);
                    return reference;

                }
                else if (chatId && text && reference && !bgColor) {

                }
                else if (chatId && text && reference && bgColor && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                } else {
                    message = new TextOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, null, chatSettings);
                    message.OutMessageMethod = sendMessage;
                    message.text = text;
                    message.bgColor = bgColor;
                    api.send();
                }

            }

            api.sendTextWithBackground = (chatId, text, bgcolor) => {
                let reference = utility.getUniqueID();
                api.sendText(chatId, text, reference, null, null, null, null, null, bgColor);
                return reference;
            }




        }

    }

    init = () => {
        if (nandboxClient != null) return;
        this.nandboxClient = new NandboxClient();
    }

    get = () => {
        if (this.nandboxClient == null)
            this.init();
        return this.nandboxClient;
    }

    connect = (token, callback) => {
        internalWebSocket = new this.InternalWebSocket(token, callback);
        this.connection = new WebSocket(this.uri);
    }


}


