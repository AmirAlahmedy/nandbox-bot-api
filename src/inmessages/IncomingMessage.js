"use strict";
import User from "../data/User";
import Chat from "../data/Chat";
import Photo from "../data/Photo";

/** 
 * it represents Incoming message Object , the incoming message Object is
 * representing Server Messages with method : message
*/
export default class IncomingMessage {

    MessageType = Object.freeze({ text: 0, photo: 1, video: 2, audio: 3, voice: 4, contact: 5, location: 6, gif: 7, document: 8, text_file: 9, sticker: 10 });

    messageId;
    type;
    date;
    reference;
    from = new User();
    replyToMessageId;
    caption;
    fromAdmin;
    chat = new Chat();
    text;
    location;
    contact;
    sentTo = new User();
    photo = new Photo();
    gif;
    voice;
    video;
    audio;
    _document;
    sticker;
    textFile;
    status;
    chatSettings;
    bgColor;

    constructor(jsonObj) {
        let obj = {};

        obj = jsonObj.message;
        
        let fromUser = new User(obj.from);
        console.log(obj.sent_to);
        let sentToUser = obj.sent_to ? new User(obj.sent_to) : null;
        console.log(sentToUser);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);

        // TODO: check the following assignments

        // this.location = obj.KEY_LOCATION ? new Location(obj.KEY_LOCATION) : null;
        // this.contact = obj.KEY_CONTACT ? new Contact(obj.KEY_CONTACT) : null;
        // this.document = obj.KEY_DOCUMENT ? new Document(obj.KEY_DOCUMENT) : null;
        this.photo = obj.photo ? new Photo(obj.photo) : null;
        // this.gif = obj.KEY_GIF ? new Gif(objKEY_GIF) : null;
        // this.voice = obj.KEY_VOICE ? new Voice(obj.KEY_VOICE) : null;
        // this.video = obj.KEY_VIDEO ? new Video(obj.KEY_VIDEO) : null;
        // this.audio = obj.KEY_AUDIO ? new Audio(obj.KEY_AUDIO) : null;
        //this.sticker = obj.KEY_STICKER ? new Sticker(obj.KEY_STICKER) : null;
        //this.textFile = obj.KEY_TEXT_FILE ? new TextFile(obj.KEY_TEXT_FILE) : null;
        this.text = obj.text;
        this.messageId = obj.message_id;
        this.date = obj.date;
        this.reference = obj.reference;
        this.from = fromUser;
        this.sentTo = sentToUser;
        //TODO: check
        this.fromAdmin = obj.from_admin;
        this.type = obj.type;
        this.caption = obj.caption;
        this.replyToMessageId = obj.reply_to_message_id;
        this.status = obj.status;
        // TODO: check 
        this.chatSettings = obj.chat_settings;
        this.bgColor = obj.bg_color;
    }

    toJsonObject = () => {
        let obj = {};

        // TODO: complete
        if (type) obj.type = type;
        if (date) obj.date = date;
        if (from) obj.from = from.toJsonObject();
        if (chat) obj.chat = chat.toJsonObject();
        if (messageId) obj.message_id = messageId;
        if (fromAdmin) obj.from_admin, fromAdmin;
        if (status) obj.status = status;
        if (sentTo) obj.sent_to = sentTo;
        if (reference) obj.reference = reference;
        if (caption) obj.caption = caption;
        if (replyToMessageId) obj.reply_to_message_id = replyToMessageId;
        if (text) obj.text = text;
        // if (location) obj.KEY_LOCATION = location;
        if (contact) obj.contact = contact;
        //if (_document) obj.KEY_DOCUMENT = _document;
        if (photo) obj.photo = photo.toJsonObject();
        if (gif) obj.gif = gif.toJsonObject();
        //if (voice) obj.KEY_VOICE = voice.toJsonObject();
        //if (video) obj.KEY_VIDEO = video.toJsonObject();
        //if (audio) obj.KEY_AUDIO = audio.toJsonObject();
        //if (sticker) obj.KEY_STICKER = sticker.toJsonObject();
        //if (textFile) obj.KEY_TEXT_FILE = textFile.toJsonObject();
        if (bgColor) obj.bg_color = bgColor;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }

    isMsgWithType = (msgType) => (msgType == this.type);
    
    isVideoMsg = () => this.isMsgWithType(this.MessageType.video);
    isTextMsg = () => this.isMsgWithType(this.MessageType.text);
    isPhotoMsg = () => this.isMsgWithType(this.MessageType.photo);
    isAudioMsg = () => this.isMsgWithType(this.MessageType.audio);
    isLocationMsg = () => this.isMsgWithType(this.MessageType.location);
    isVoiceMsg = () => this.isMsgWithType(this.MessageType.voice);
    isGifMsg = () => this.isMsgWithType(this.MessageType.gif);
    isStickerMsg = () => this.isMsgWithType(this.MessageType.sticker);
    isTextFileMsg = () => this.isMsgWithType(this.MessageType.text_file);
    isDocumentMsg = () => this.isMsgWithType(this.MessageType.document);
    isContactMsg = () => this.isMsgWithType(this.MessageType.contact);
    

}