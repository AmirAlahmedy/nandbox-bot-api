"use strict";
import NandBox from "./NandBox";
import User from "./data/User";
import TextOutMessage from "./outmessages/TextOutMessage";
import PhotoOutMessage from "./outmessages/PhotoOutMessage";
import ContactOutMessage from "./outmessages/ContactOutMessage";
import AudioOutMessage from "./outmessages/AudioOutMessage";
import VoiceOutMessage from "./outmessages/VoiceOutMessage";
import DocumentOutMessage from "./outmessages/DocumentOutMessage";
import LocationOutMessage from "./outmessages/LocationOutMessage";
import UpdateOutMessage from "./outmessages/UpdateOutMessage";
import GetChatMemberOutMessage from "./outmessages/GetChatMemberOutMessage";
import GetUserOutMessage from "./outmessages/GetUserOutMessage";
import GetChatOutMessage from "./outmessages/GetChatOutMessage";
import GetChatAdministratorsOutMessage from "./outmessages/GetChatAdministratorsOutMessage";
import BanChatMemberOutMessage from "./outmessages/BanChatMemberOutMessage";
import UnbanChatMember from "./outmessages/UnbanChatMember";
import RemoveChatMemberOutMessage from "./outmessages/RemoveChatMemberOutMessage";
import RecallOutMessage from "./outmessages/RecallOutMessage";
import SetMyProfileOutMessage from "./outmessages/SetMyProfileOutMessage";
import SetChatOutMessage from "./outmessages/SetChatOutMessage";
import GetMyProfiles from "./outmessages/GetMyProfiles";
import GeneratePermanentUrl from "./outmessages/GeneratePermanentUrl";
import { Id } from "./util/Utility";
import IncomingMessage from "./inmessages/IncomingMessage";
import MessageAck from "./inmessages/MessageAck";
import "@babel/polyfill";
import WebSocket from "ws";

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
        let CONFIG_FILE = require('../config.json');
        console.log(CONFIG_FILE);
        return CONFIG_FILE;
    } catch (error) {
        // TODO: handle config error
        console.log(error);
    }
}

export default class NandBoxClient {

    static uri = getConfigs().URI;

    constructor() {
        connection = new WebSocket.Server({ port: 8080 });
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


            connection.onopen = () => {

                console.log("INTERNAL: ONCONNECT");

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

                this.api.sendTextWithBackground = (chatId, text, bgColor) => {
                    const reference = Id();
                    this.api.sendText(chatId, text, reference, null, null, null, null, null, bgColor);
                    return reference;
                }

                this.api.sendPhoto = (chatId, photoFileId, reference, replyToMessageId,
                    toUserId, webPagePreview, disableNotification, caption,
                    chatSettings) => {

                    if (chatId && photoFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                        const reference = Id();
                        this.api.sendPhoto(chatId, photoFileId, reference, null, null, null, null, caption, null);

                    } else {
                        let message = new PhotoOutMessage();
                        this.api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendPhoto";
                        message.photo = photoFileId;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }

                }

                this.api.sendContact = (chatId, phoneNumber, name, reference,
                    replyToMessageId, toUserId, webPagePreview, disableNotification,
                    chatSettings) => {
                    if (chatId && phoneNumber && name && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                        const reference = Id();
                        this.api.sendContact(chatId, phoneNumber, name, reference, null, null, null, null, null);

                    } else {

                        let contactOutMessage = new ContactOutMessage();
                        this.api.prepareOutMessage(contactOutMessage, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, null, chatSettings);

                        contactOutMessage.method = "sendContact";
                        contactOutMessage.phone_number = phoneNumber;
                        contactOutMessage.name = name;
                        contactOutMessage.reference = reference;
                        this.api.send(JSON.stringify(contactOutMessage));


                    }
                }

                this.api.sendVideo = (chatId, videoFileId, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, caption, chatSettings) => {
                    if (chatId && videoFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                        const reference = Id();
                        this.api.sendVideo(chatId, videoFileId, reference, null, null, null, null, caption, null);

                    } else {
                        let message = new VideoOutMessage();
                        this.api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendVideo";
                        message.video = videoFileId;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.sendAudio = (chatId, audioFileId, reference, replyToMessageId,
                    toUserId, webPagePreview, disableNotification, caption,
                    performer, title, chatSettings) => {

                    if (chatId && audioFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !performer && !title && !chatSettings) {

                        const reference = Id();
                        this.api.sendAudio(chatId, audioFileId, reference, null, null, null, null, caption, null, null, null);
                    } else {
                        let message = new AudioOutMessage();
                        this.api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendAudio";
                        message.performer = performer;
                        message.title = title;
                        message.audio = audioFileId;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.sendVoice = (chatId, voiceFileId, reference, replyToMessageId,
                    toUserId, webPagePreview, disableNotification, caption, size, chatSettings) => {

                    if (chatId && voiceFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !size && !chatSettings) {

                        const reference = Id();
                        this.api.sendVoice(chatId, voiceFileId, reference, null, null, null, null, caption, null, null);

                    } else {
                        let message = new VoiceOutMessage();
                        prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendVoice";
                        message.size = size;
                        message.voice = voiceFileId;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.sendDocument = (chatId, documentFileId, reference, replyToMessageId, toUserId, webPagePreview,
                    disableNotification, caption, name, size, chatSettings) => {

                    if (chatId && documentFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !name && !size && chatSettings) {

                        const reference = Id();
                        this.api.sendDocument(chatId, documentFileId, reference, null, null, null, null, caption, null, null, null);

                    } else {
                        let message = new DocumentOutMessage();
                        prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendDocument";
                        message.document = documentFileId;
                        message.name = name;
                        message.size = size;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.sendlocation = (chatId, latitude, longitude, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, name, details, chatSettings) => {

                    if (chatId && latitude && longitude && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !name && !details && !chatSettings) {

                        const reference = Id();
                        this.api.endlocation(chatId, latitude, longitude, reference, null, null, null, null, null, null, null);
                    } else {
                        let message = new LocationOutMessage();
                        prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, null, chatSettings);
                        message.method = "sendLocation";
                        message.name = name;
                        message.details = details;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.sendGIF = (chatId, gif, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, caption,
                    chatSettings) => {

                    if (chatId && gif && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview &&
                        !disableNotification && !chatSettings) {

                        const reference = Id();
                        this.api.sendPhoto(chatId, gif, reference, null, null, null, null, caption, null);
                    } else {
                        let message = new PhotoOutMessage();
                        prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendPhoto";
                        message.photo = gif;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.sendGIFVideo = (chatId, gif, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, caption,
                    chatSettings) => {
                    if (chatId && gif && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview &&
                        !disableNotification && !chatSettings) {

                        this.api.sendVideo(chatId, gif, reference, null, null, null, null, caption, null);

                    } else {
                        let message = new VideoOutMessage();
                        prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                            disableNotification, caption, chatSettings);
                        message.method = "sendVideo";
                        message.video = gif;
                        message.reference = reference;
                        this.api.send(JSON.stringify(message));
                    }
                }

                this.api.updateMessage = (messageId, text, caption, toUserId, chatId) => {

                    let updateMessage = new UpdateOutMessage();

                    updateMessage.message_id = messageId;
                    updateMessage.text = text;
                    updateMessage.caption = caption;
                    updateMessage.to_user_id = toUserId;
                    updateMessage.chat_id = chatId;

                    this.api.send(JSON.stringify(updateMessage));

                }

                this.api.updateTextMsg = (messageId, text, toUserId) => {

                    updateMessage(messageId, text, null, toUserId, null);
                }

                this.api.updateMediaCaption = (messageId, caption, toUserId) => {

                    updateMessage(messageId, null, caption, toUserId, null);
                }

                this.api.updateChatMsg = (messageId, text, chatId) => {

                    updateMessage(messageId, text, null, null, chatId);
                }

                this.api.updateChatMediaCaption = (messageId, caption, chatId) => {

                    updateMessage(messageId, null, caption, null, chatId);
                }

                this.api.getChatMember = (chatId, userId) => {
                    let getChatMemberOutMessage = new GetChatMemberOutMessage();
                    getChatMemberOutMessage.chat_id = chatId;
                    getChatMemberOutMessage.user_id = userId;
                    this.api.send(JSON.stringify(getChatMemberOutMessage));
                }

                this.api.getUser = userId => {
                    let getUserOutMessage = new GetUserOutMessage();
                    getUserOutMessage.user_id = userId;
                    this.api.send(JSON.stringify(getUserOutMessage));
                }

                this.api.getChat = chatId => {
                    let chatOutMessage = new GetChatOutMessage();
                    chatOutMessage.chat_id = chatId;
                    this.api.send(JSON.stringify(chatOutMessage));
                }

                this.api.getChatAdministrators = chatId => {
                    let getChatAdministratorsOutMessage = new GetChatAdministratorsOutMessage();
                    getChatAdministratorsOutMessage.chat_id = chatId;
                    this.api.send(JSON.stringify(getChatAdministratorsOutMessage));
                }

                this.api.banChatMember = (chatId, userId) => {
                    let banChatMemberOutMessage = new BanChatMemberOutMessage();
                    banChatMemberOutMessage.chat_id = chatId;
                    banChatMemberOutMessage.user_id = userId;
                    this.api.send(JSON.stringify(banChatMemberOutMessage));
                }

                this.api.unbanChatMember = (chatId, userId) => {
                    let unbanChatMember = new UnbanChatMember();
                    unbanChatMember.chat_id = chatId;
                    unbanChatMember.user_id = userId;
                    this.api.send(JSON.stringify(unbanChatMember));
                }

                this.api.removeChatMember = (chatId, userId) => {
                    let removeChatMemberOutMessage = new RemoveChatMemberOutMessage();
                    removeChatMemberOutMessage.chat_id = chatId;
                    removeChatMemberOutMessage.user_id = userId;
                    this.api.send(JSON.stringify(removeChatMemberOutMessage));
                }

                this.api.recallMessage = (chatId, messageId, toUserId, reference) => {
                    let recallOutMessage = new RecallOutMessage();
                    recallOutMessage.chat_id = chatId;
                    recallOutMessage.message_id = messageId;
                    recallOutMessage.to_user_id = toUserId;
                    recallOutMessage.reference = reference;
                    this.api.send(JSON.stringify(recallOutMessage));
                }

                this.api.setMyProifle = user => {
                    let setMyProfileOutMessage = new SetMyProfileOutMessage();
                    setMyProfileOutMessage.user = user;
                    this.api.send(JSON.stringify(setMyProfileOutMessage));
                }

                this.api.setChat = chat => {
                    let setChatOutMessage = new SetChatOutMessage();
                    setChatOutMessage.chat = chat;
                    this.api.send(JSON.stringify(setChatOutMessage));
                }

                this.api.getMyProfiles = () => {
                    let getMyProfiles = new GetMyProfiles();
                    this.api.send(JSON.stringify(getMyProfiles));
                }

                this.api.generatePermanentUrl = (file, param1) => {
                    let generatePermanentUrl = new GeneratePermanentUrl();
                    generatePermanentUrl.file = file;
                    generatePermanentUrl.param1 = param1;
                    this.api.send(JSON.stringify(generatePermanentUrl));
                }


                let strAuthObj = JSON.stringify(authObject);
                console.log(strAuthObj);
                this.send(strAuthObj);
            }


            connection.onerror = error => { console.log("ONERROR: " + error); }


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
