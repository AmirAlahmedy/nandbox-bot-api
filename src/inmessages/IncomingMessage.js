"use strict";
const User = require("../data/User");
const Chat = require("../data/Chat");
const Photo = require("../data/Photo");
const Contact = require("../data/Contact");
const Location = require("../data/Location");
const Document = require("../data/Document");
const Gif = require("../data/Gif");
const Video = require("../data/Video");
const Voice = require("../data/Voice");
const Audio = require("../data/Audio");
const TextFile = require("../data/TextFile");
const Article = require("../data/Article");
/** 
 * it represents Incoming message Object , the incoming message Object is
 * representing Server Messages with method : message
 * 
 * @author Ahmed A. El-Malatawy @author Amir
 * 
*/
module.exports = class IncomingMessage {

    constructor(jsonObj) {
        let obj = {};

        obj = jsonObj.message;

        this.chat = obj.chat == null ? null : new Chat(obj.chat);
        this.location = obj.location ? new Location(obj.location) : null;
        this.contact = obj.contact ? new Contact(obj.contact) : null;
        this.document = obj.document ? new Document(obj.document) : null;
        this.photo = obj.photo ? new Photo(obj.photo) : null;
        this.gif = obj.gif ? new Gif(obj.gif) : null;
        this.voice = obj.voice ? new Voice(obj.voice) : null;
        this.video = obj.video ? new Video(obj.video) : null;
        this.audio = obj.audio ? new Audio(obj.audio) : null;
        this.sticker = obj.sticker ? new Sticker(obj.sticker) : null;
        this.text_file = obj.text_file ? new TextFile(obj.text_file) : null;
        this.text = obj.text;
        this.message_id = obj.message_id;
        this.date = obj.date;
        this.reference = obj.reference;
        this.from = obj.from;
        this.sent_to = obj.sent_to_user;
        this.from_admin = obj.from_admin;
        this.type = obj.type;
        this.caption = obj.caption;
        this.reply_to_message_id = obj.reply_to_message_id;
        this.status = obj.status;
        this.chat_settings = obj.chat_settings;
        this.bg_color = obj.bg_color;
        this.article = obj.article ? new Article(obj.article) : null;
        this.url = obj.url;
    }

    toJsonObject(){
        let obj = {};

        if (this.type) obj.type = this.type;
        if (this.date) obj.date = this.date;
        if (this.from) obj.from= this.from.toJsonObject();
        if (this.chat) obj.chat = this.chat.toJsonObject();
        if (this.message_id) obj.message_id = this.message_id;
        if (this.from_admin) obj.from_admin = this.from_admin;
        if (this.status) obj.status = this.status;
        if (this.sent_to) obj.sent_to = this.sent_to;
        if (this.reference) obj.reference = this.reference;
        if (this.caption) obj.caption = this.caption;
        if (this.reply_to_message_id) obj.reply_to_message_id = this.reply_to_message_id;
        if (this.text) obj.text = this.text;
        if (this.location) obj.location = this.location;
        if (this.contact) obj.contact = this.contact;
        if (this.document) obj.document = this.document;
        if (this.photo) obj.photo = this.photo.toJsonObject();
        if (this.gif) obj.gif = this.gif.toJsonObject();
        if (this.voice) obj.voice = voice.toJsonObject();
        if (this.video) obj.video = this.video.toJsonObject();
        if (this.audio) obj.audio = audio.toJsonObject();
        if (this.sticker) obj.sticker = this.sticker.toJsonObject();
        if (this.text_file) obj.text_file = text_file.toJsonObject();
        if (this.bg_color) obj.bg_color = this.bg_color;
        if (this.article) obj.article = this.article.toJsonObject();
        if (this.url) obj.url = this.url;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }

    isMsgWithType(msgType) { return msgType == this.type; }

    isVideoMsg() { return this.isMsgWithType("video");}
    isTextMsg() { return this.isMsgWithType("text");}
    isPhotoMsg() { return this.isMsgWithType("photo");}
    isAudioMsg() { return this.isMsgWithType("audio");}
    isLocationMsg() {return this.isMsgWithType("location");}
    isVoiceMsg() { return this.isMsgWithType("voice");}
    isGifMsg() { return this.isMsgWithType("gif");}
    isStickerMsg() { return this.isMsgWithType("sticker");}
    isTextFileMsg() { return this.isMsgWithType("text_file");}
    isDocumentMsg() { return this.isMsgWithType("document");}
    isContactMsg() {return  this.isMsgWithType("contact")};

}