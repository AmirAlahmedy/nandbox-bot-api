"use strict";
const NandBox = require("./NandBox");
const User = require("./data/User");
const Chat = require("./data/Chat");
const ChatMenuCallback = require("./inmessages/ChatMenuCallback");
const ChatAdministrators = require("./inmessages/ChatAdministrators");
const PermanentUrl = require("./inmessages/PermanentUrl");
const InlineMessageCallback = require("./inmessages/InlineMessageCallback");
const InlineSearch = require("./inmessages/InlineSearch");
const ChatMember = require("./inmessages/ChatMember");
const TextOutMessage = require("./outmessages/TextOutMessage");
const PhotoOutMessage = require("./outmessages/PhotoOutMessage");
const ContactOutMessage = require("./outmessages/ContactOutMessage");
const AudioOutMessage = require("./outmessages/AudioOutMessage");
const VoiceOutMessage = require("./outmessages/VoiceOutMessage");
const VideoOutMessage = require("./outmessages/VideoOutMessage");
const DocumentOutMessage = require("./outmessages/DocumentOutMessage");
const LocationOutMessage = require("./outmessages/LocationOutMessage");
const UpdateOutMessage = require("./outmessages/UpdateOutMessage");
const GetChatMemberOutMessage = require("./outmessages/GetChatMemberOutMessage");
const GetUserOutMessage = require("./outmessages/GetUserOutMessage");
const GetChatOutMessage = require("./outmessages/GetChatOutMessage");
const GetChatAdministratorsOutMessage = require("./outmessages/GetChatAdministratorsOutMessage");
const BanChatMemberOutMessage = require("./outmessages/BanChatMemberOutMessage");
const UnbanChatMember = require("./outmessages/UnbanChatMember");
const RemoveChatMemberOutMessage = require("./outmessages/RemoveChatMemberOutMessage");
const RecallOutMessage = require("./outmessages/RecallOutMessage");
const SetMyProfileOutMessage = require("./outmessages/SetMyProfileOutMessage");
const SetChatOutMessage = require("./outmessages/SetChatOutMessage");
const GetMyProfiles = require("./outmessages/GetMyProfiles");
const GeneratePermanentUrl = require("./outmessages/GeneratePermanentUrl");
const Utils = require("./util/Utility");
const Id = Utils.Id;
const Data = require('./data/Data');
const WhiteListUser = require('./data/WhiteListUser');
const BlackList = require('./inmessages/BlackList');
const WhiteList = require('./inmessages/WhiteList');
const AddBlackListOutMessage = require('./outmessages/AddBlackListOutMessage');
const AddBlackListPatternsOutMessage = require('./outmessages/AddBlackListPatternsOutMessage');
const AddWhiteListOutMessage = require('./outmessages/AddWhiteListOutMessage');
const AddWhiteListPatternsOutMessage = require('./outmessages/AddWhiteListPatternsOutMessage');
const DeleteBlackListOutMessage = require('./outmessages/DeleteBlackListOutMessage');
const DeleteBlackListPatternsOutMessage = require('./outmessages/DeleteBlackListPatternsOutMessage');
const DeleteWhiteListOutMessage = require('./outmessages/DeleteWhiteListOutMessage');
const DeleteWhiteListPatternsOutMessage = require('./outmessages/DeleteWhiteListPatternsOutMessage');
const GetBlackListOutMessage = require('./outmessages/GetBlackListOutMessage');
const GetWhiteListOutMessage = require('./outmessages/GetWhiteListOutMessage');
const IncomingMessage = require("./inmessages/IncomingMessage");
const MessageAck = require("./inmessages/MessageAck");
require("@babel/polyfill");
const WebSocket = require("ws");
const Logger = require('./util/Logger');

var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var nandboxClient = null;
var connection = null;
var BOT_ID = null;
var closingCounter = 0;


class NandBoxClient {

    constructor(URI) {
        this.uri = URI;
        // connection = new WebSocket.Server({ port: 8080 });
    }

    static get(config){
        if (!nandboxClient) {
            init(config);
        }
        return nandboxClient;
    }

    connect(token, callback){
        connection = new WebSocket(this.uri);
        new InternalWebSocket(token, callback);
    }

}

let tNandBox = new NandBox();
let api = tNandBox.Api;
class InternalWebSocket {

    constructor(token, callback) {
        this.token = token;
        this.callback = callback;
        this.connect();
        this.pingpong();
    }

    connect(){


        connection.onclose = async status => {
            console.log("INTERNAL: ONCLOSE");
            console.log("StatusCode = " + status.code);
            console.log("Reason : " + status.reason);
            Logger.logger.info('INTERNAL: ONCLOSE');
            Logger.logger.info("StatusCode = " + status.code);
            Logger.logger.info("Reason : " + status.reason);

            let current_datetime = new Date();
            let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" +
                current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" +
                current_datetime.getSeconds();

            console.log(formatted_date);

            this.authenticated = false;

            // TODO: pingpong here
            clearInterval(this.pingpong);

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
                // TODO: 
                // System.exit(0)
            }

        };


        connection.onopen = () => {

            console.log("INTERNAL: ONCONNECT");

            let authObject = {};
            authObject.method = "TOKEN_AUTH";
            authObject.token = this.token;
            authObject.rem = true;


            api.send = message => {

                console.log(new Date() + ">>>>>> Sending Message :", message);
                this.send(message);

            }

            api.prepareOutMessage = (message, chatId, reference,
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

            api.sendText = (chatId, text, reference, replyToMessageId, toUserId, webPagePreview, disableNotification,
                chatSettings, bgColor) => {
                if (chatId && text && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification &&
                    !chatSettings && !bgColor) {

                    const reference = Id();

                    api.sendText(chatId, text, reference, null, null, null, null, null, null);
                    return reference;

                }
                else if (chatId && text && reference && !bgColor && !replyToMessageId && !toUserId && !webPagePreview &&
                    !disableNotification && !chatSettings) {
                    let message = new TextOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, null, chatSettings);
                    message.method = "sendMessage";
                    message.text = text;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
                else if (chatId && text && reference && bgColor && !replyToMessageId && !toUserId && !webPagePreview &&
                    !disableNotification && !chatSettings) {
                    let message = new TextOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, null, chatSettings);
                    message.method = "sendMessage";
                    message.text = text;
                    message.reference = reference;
                    message.bgColor = bgColor;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendTextWithBackground = (chatId, text, bgColor) => {
                const reference = Id();
                api.sendText(chatId, text, reference, null, null, null, null, null, bgColor);
                return reference;
            }

            api.sendPhoto = (chatId, photoFileId, reference, replyToMessageId,
                toUserId, webPagePreview, disableNotification, caption,
                chatSettings) => {

                if (chatId && photoFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                    const reference = Id();
                    api.sendPhoto(chatId, photoFileId, reference, null, null, null, null, caption, null);

                } else {
                    let message = new PhotoOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendPhoto";
                    message.photo = photoFileId;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }

            }

            api.sendContact = (chatId, phoneNumber, name, reference,
                replyToMessageId, toUserId, webPagePreview, disableNotification,
                chatSettings) => {
                if (chatId && phoneNumber && name && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                    const reference = Id();
                    api.sendContact(chatId, phoneNumber, name, reference, null, null, null, null, null);

                } else {

                    let contactOutMessage = new ContactOutMessage();
                    api.prepareOutMessage(contactOutMessage, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, null, chatSettings);

                    contactOutMessage.method = "sendContact";
                    contactOutMessage.phone_number = phoneNumber;
                    contactOutMessage.name = name;
                    contactOutMessage.reference = reference;
                    api.send(JSON.stringify(contactOutMessage));


                }
            }

            api.sendVideo = (chatId, videoFileId, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, caption, chatSettings) => {
                if (chatId && videoFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !chatSettings) {

                    const reference = Id();
                    api.sendVideo(chatId, videoFileId, reference, null, null, null, null, caption, null);

                } else {
                    let message = new VideoOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendVideo";
                    message.video = videoFileId;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendAudio = (chatId, audioFileId, reference, replyToMessageId,
                toUserId, webPagePreview, disableNotification, caption,
                performer, title, chatSettings) => {

                if (chatId && audioFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !performer && !title && !chatSettings) {

                    const reference = Id();
                    api.sendAudio(chatId, audioFileId, reference, null, null, null, null, caption, null, null, null);
                } else {
                    let message = new AudioOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendAudio";
                    message.performer = performer;
                    message.title = title;
                    message.audio = audioFileId;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendVoice = (chatId, voiceFileId, reference, replyToMessageId,
                toUserId, webPagePreview, disableNotification, caption, size, chatSettings) => {

                if (chatId && voiceFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !size && !chatSettings) {

                    const reference = Id();
                    api.sendVoice(chatId, voiceFileId, reference, null, null, null, null, caption, null, null);

                } else {
                    let message = new VoiceOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendVoice";
                    message.size = size;
                    message.voice = voiceFileId;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendDocument = (chatId, documentFileId, reference, replyToMessageId, toUserId, webPagePreview,
                disableNotification, caption, name, size, chatSettings) => {

                if (chatId && documentFileId && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !name && !size && chatSettings) {

                    const reference = Id();
                    api.sendDocument(chatId, documentFileId, reference, null, null, null, null, caption, null, null, null);

                } else {
                    let message = new DocumentOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendDocument";
                    message.document = documentFileId;
                    message.name = name;
                    message.size = size;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendlocation = (chatId, latitude, longitude, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, name, details, chatSettings) => {

                if (chatId && latitude && longitude && !reference && !replyToMessageId && !toUserId && !webPagePreview && !disableNotification && !name && !details && !chatSettings) {

                    const reference = Id();
                    api.sendlocation(chatId, latitude, longitude, reference, null, null, null, null, null, null, null);
                } else {
                    let message = new LocationOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, null, chatSettings);
                    message.method = "sendLocation";
                    message.name = name;
                    message.details = details;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendGIF = (chatId, gif, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, caption,
                chatSettings) => {

                if (chatId && gif && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview &&
                    !disableNotification && !chatSettings) {

                    const reference = Id();
                    api.sendPhoto(chatId, gif, reference, null, null, null, null, caption, null);
                } else {
                    let message = new PhotoOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendPhoto";
                    message.photo = gif;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.sendGIFVideo = (chatId, gif, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, caption,
                chatSettings) => {
                if (chatId && gif && caption && !reference && !replyToMessageId && !toUserId && !webPagePreview &&
                    !disableNotification && !chatSettings) {

                    api.sendVideo(chatId, gif, reference, null, null, null, null, caption, null);

                } else {
                    let message = new VideoOutMessage();
                    api.prepareOutMessage(message, chatId, reference, replyToMessageId, toUserId, webPagePreview,
                        disableNotification, caption, chatSettings);
                    message.method = "sendVideo";
                    message.video = gif;
                    message.reference = reference;
                    api.send(JSON.stringify(message));
                }
            }

            api.updateMessage = (messageId, text, caption, toUserId, chatId) => {

                let updateMessage = new UpdateOutMessage();

                updateMessage.message_id = messageId;
                updateMessage.text = text;
                updateMessage.caption = caption;
                updateMessage.toUser_id = toUserId;
                updateMessage.chat_id = chatId;

                api.send(JSON.stringify(updateMessage));

            }

            api.updateTextMsg = (messageId, text, toUserId) => {

                updateMessage(messageId, text, null, toUserId, null);
            }

            api.updateMediaCaption = (messageId, caption, toUserId) => {

                updateMessage(messageId, null, caption, toUserId, null);
            }

            api.updateChatMsg = (messageId, text, chatId) => {

                updateMessage(messageId, text, null, null, chatId);
            }

            api.updateChatMediaCaption = (messageId, caption, chatId) => {

                updateMessage(messageId, null, caption, null, chatId);
            }

            api.getChatMember = (chatId, userId) => {
                let getChatMemberOutMessage = new GetChatMemberOutMessage();
                getChatMemberOutMessage.chat_id = chatId;
                getChatMemberOutMessage.user_id = userId;
                api.send(JSON.stringify(getChatMemberOutMessage));
            }

            api.getUser = userId => {
                let getUserOutMessage = new GetUserOutMessage();
                getUserOutMessage.user_id = userId;
                api.send(JSON.stringify(getUserOutMessage));
            }

            api.getChat = chatId => {
                let chatOutMessage = new GetChatOutMessage();
                chatOutMessage.chat_id = chatId;
                api.send(JSON.stringify(chatOutMessage));
            }

            api.getChatAdministrators = chatId => {
                let getChatAdministratorsOutMessage = new GetChatAdministratorsOutMessage();
                getChatAdministratorsOutMessage.chat_id = chatId;
                /* api.sendText(getChatAdministratorsOutMessage.chat_id,
                    "Chat admins: " + getChatAdministratorsOutMessage); */
                api.send(JSON.stringify(getChatAdministratorsOutMessage));
            }

            api.banChatMember = (chatId, userId) => {
                let banChatMemberOutMessage = new BanChatMemberOutMessage();
                banChatMemberOutMessage.chat_id = chatId;
                banChatMemberOutMessage.user_id = userId;
                api.send(JSON.stringify(banChatMemberOutMessage));
            }
            api.addBlackList = (chatId, users) => {

                let addBlackListOutMessage = new AddBlackListOutMessage();
                addBlackListOutMessage.chat_id = chatId;
                addBlackListOutMessage.users = users;

                api.send(JSON.stringify(addBlackListOutMessage));
            }

            api.addWhiteList = (chatId, whiteListUsers) => {

                let addWhiteistOutMessage = new AddWhiteListOutMessage();
                
                addWhiteistOutMessage.chat_id = chatId;
                addWhiteistOutMessage.users = whiteListUsers;

                api.send(JSON.stringify(addWhiteistOutMessage));
            }

            api.deleteBlackList = (chatId, users) => {

                let deleteBlackListOutMessage = new DeleteBlackListOutMessage();
                deleteBlackListOutMessage.chat_id = chatId;
                deleteBlackListOutMessage.users = users;

                api.send(JSON.stringify(deleteBlackListOutMessage));
            }

            api.deleteWhiteList = (chatId, users) => {

                let deleteWhiteListOutMessage = new DeleteWhiteListOutMessage();
                deleteWhiteListOutMessage.chat_id = chatId;
                deleteWhiteListOutMessage.users = users;

                api.send(JSON.stringify(deleteWhiteListOutMessage));
            }

            api.deleteBlackListPatterns = (chatId, pattern) => {

                let deleteBlackListPatterns = new DeleteBlackListPatternsOutMessage();
                deleteBlackListPatterns.chat_id = chatId;
                deleteBlackListPatterns.pattern = pattern;

                api.send(JSON.stringify(deleteBlackListPatterns));
            }
            
            api.deleteWhiteListPatterns = (chatId, pattern) => {

                let deleteWhiteListPatterns = new DeleteWhiteListPatternsOutMessage();
                deleteWhiteListPatterns.chat_id = chatId;
                deleteWhiteListPatterns.pattern = pattern;

                api.send(JSON.stringify(deleteWhiteListPatterns));
            }

            api.addBlacklistPatterns = (chatId, data) => {

                let addBlacklistPatternsOutMessage = new AddBlacklistPatternsOutMessage();
                addBlacklistPatternsOutMessage.chat_id = chatId;
                addBlacklistPatternsOutMessage.data = data;

                api.send(JSON.stringify(addBlacklistPatternsOutMessage));
            }
            api.addWhitelistPatterns = (chatId, data) => {

                let addWhitelistPatternsOutMessage = new AddWhitelistPatternsOutMessage();
                addWhitelistPatternsOutMessage.chat_id = chatId;
                addWhitelistPatternsOutMessage.data = data;

                api.send(JSON.stringify(addWhitelistPatternsOutMessage));
            }

            api.unbanChatMember = (chatId, userId) => {
                let unbanChatMember = new UnbanChatMember();
                unbanChatMember.chat_id = chatId;
                unbanChatMember.user_id = userId;
                api.send(JSON.stringify(unbanChatMember));
            }

            api.removeChatMember = (chatId, userId) => {
                let removeChatMemberOutMessage = new RemoveChatMemberOutMessage();
                removeChatMemberOutMessage.chat_id = chatId;
                removeChatMemberOutMessage.user_id = userId;
                api.send(JSON.stringify(removeChatMemberOutMessage));
            }

            api.recallMessage = (chatId, messageId, toUserId, reference) => {
                let recallOutMessage = new RecallOutMessage();
                recallOutMessage.chat_id = chatId;
                recallOutMessage.message_id = messageId;
                recallOutMessage.to_user_id = toUserId;
                recallOutMessage.reference = reference;
                api.send(JSON.stringify(recallOutMessage));
            }

            api.setMyProifle = user => {
                let setMyProfileOutMessage = new SetMyProfileOutMessage();
                setMyProfileOutMessage.user = user;
                api.send(JSON.stringify(setMyProfileOutMessage));
            }

            api.setChat = chat => {
                let setChatOutMessage = new SetChatOutMessage();
                setChatOutMessage.chat = chat;
                api.send(JSON.stringify(setChatOutMessage));
            }

            api.getMyProfiles = () => {
                let getMyProfiles = new GetMyProfiles();
                api.send(JSON.stringify(getMyProfiles));
            }

            api.generatePermanentUrl = (file, param1) => {
                let generatePermanentUrl = new GeneratePermanentUrl();
                generatePermanentUrl.file = file;
                generatePermanentUrl.param1 = param1;
                api.send(JSON.stringify(generatePermanentUrl));
            }

            api.getBlackList = (chatId) => {
                let getBlackListOutMessage = new GetBlackListOutMessage();
                getBlackListOutMessage.chat_id = chatId;

                api.send(JSON.stringify(getBlackListOutMessage));
            }


            api.getWhiteList = (chatId) => {
                let getWhiteListOutMessage = new GetWhiteListOutMessage();
                getWhiteListOutMessage.chat_id = chatId;

                api.send(JSON.stringify(getWhiteListOutMessage));
            }


            let strAuthObj = JSON.stringify(authObject);
            console.log(strAuthObj);
            this.send(strAuthObj);
        }


        connection.onerror = error => { console.log("ONERROR: ", error); }


        connection.onmessage = msg => {
            let user;
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

                        this.callback.onConnect(api, obj);

                        return;
                    case "message":
                        let incomingMessage = new IncomingMessage(obj);
                        this.callback.onReceive(incomingMessage);
                        return;
                    case "chatMenuCallback":
                        let chatMenuCallback = new ChatMenuCallback(obj);
                        this.callback.onChatMenuCallBack(chatMenuCallback);
                        return;
                    case "inlineMessageCallback":
                        let inlineMsgCallback = new InlineMessageCallback(obj);
                        this.callback.onInlineMessageCallback(inlineMsgCallback);
                        return;
                    case "inlineSearch":
                        let inlineSearch = new InlineSearch(obj);
                        this.callback.onInlineSearh(inlineSearch);
                        return;
                    case "messageAck":
                        let msgAck = new MessageAck(obj);
                        this.callback.onMessagAckCallback(msgAck);
                        return;
                    case "userJoinedBot":
                        user = new User(obj.user);
                        this.callback.onUserJoinedBot(user);
                        return;
                    case "chatMember":
                        let chatMember = new ChatMember(obj);
                        this.callback.onChatMember(chatMember);
                        return;
                    case "myProfile":
                        user = new User(obj.user);
                        this.callback.onMyProfile(user);
                        return;
                    case "userDetails":
                        user = new User(obj.user);
                        this.callback.onUserDetails(user);
                        return;
                    case "chatDetails":
                        let chat = new Chat(obj.chat);
                        this.callback.onChatDetails(chat);
                        return;
                    case "chatAdministrators":
                        let chatAdministrators = new ChatAdministrators(obj);
                        this.callback.onChatAdministrators(chatAdministrators);
                        return;
                    case "userStartedBot":
                        user = new User(obj.user);
                        this.callback.userStartedBot(user);
                        return;
                    case "userStoppedBot":
                        user = new User(obj.user);
                        this.callback.userStoppedBot(user);
                        return;
                    case "userLeftBot":
                        user = new User(obj.user);
                        this.callback.userLeftBot(user);
                        return;
                    case "userLeftBot":
                        let permenantURL = new PermanentUrl(obj);
                        this.callback.permanentUrl(permenantURL);
                        return;
                    case "blacklist":
                            let blackList = new BlackList(obj);
                            this.callback.onBlackList(blackList);
                            return;
                    case "whitelist":
                            let whiteList = new WhiteList(obj);
                            this.callback.onWhiteList(whiteList);
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

    pingpong() {
        return setInterval(() => {
            let obj = {};
            obj.method = "PING";
            connection.send(JSON.stringify(obj));

        }, 30000);
    }
   

    reconnectWebSocketClient(){
        console.log("Creating new webSocketClient");
        connection = new WebSocket(this.uri);
        console.log("webSocketClient started");
        console.log("Getting NandboxClient Instance");
        nandboxClient = NandBoxClient.get();
        console.log("Calling NandboxClient connect");
        nandboxClient.connect(this.token, this.callback);
    }

    send(s){
        try {
            if (connection) {
                connection.send(s);
                clearInterval(this.pingpong);
            }

        }
        catch (e) {
            console.log(new Error().stack)
            console.log(e);
        }
    }

    stopWebSocketClient(){
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


let init = (config) => {
    if (nandboxClient) return;
    nandboxClient = new NandBoxClient(config.URI);
}


module.exports = {
    NandBoxClient: NandBoxClient,
}