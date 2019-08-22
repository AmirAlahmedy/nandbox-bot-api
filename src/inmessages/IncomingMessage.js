"use strict";
import User from "../data/User";
import Chat from "../data/Chat";
import Photo from "../data/Photo";
import Contact from "../data/Contact";
import Location from "../data/Location";
import Document from "../data/Document";
import Gif from "../data/Gif";
import Video from "../data/Video";
import Voice from "../data/Voice";
import Audio from "../data/Audio";
import TextFile from "../data/TextFile";
/** 
 * it represents Incoming message Object , the incoming message Object is
 * representing Server Messages with method : message
 * 
 * @author Ahmed A. El-Malatawy @author Amir
 * 
*/
export default  class IncomingMessage {

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

        /* let fromUser = new User(obj.from);
        console.log(obj.sent_to);
        let sentToUser = obj.sent_to ? new User(obj.sent_to) : null;
        console.log(sentToUser); */
        this.chat = obj.chat == null ? null : new Chat(obj.chat);
        this.location = obj.location ? new Location(obj.location) : null;
        this.contact = obj.contact ? new Contact(obj.contact) : null;
        this._document = obj.document ? new Document(obj.document) : null;
        this.photo = obj.photo ? new Photo(obj.photo) : null;
        this.gif = obj.gif ? new Gif(obj.gif) : null;
        this.voice = obj.voice ? new Voice(obj.voice) : null;
        this.video = obj.video ? new Video(obj.video) : null;
        this.audio = obj.audio ? new Audio(obj.audio) : null;
        this.sticker = obj.sticker ? new Sticker(obj.sticker) : null;
        this.textFile = obj.text_file ? new TextFile(obj.text_file) : null;
        this.text = obj.text;
        this.messageId = obj.message_id;
        this.date = obj.date;
        this.reference = obj.reference;
        this.from = obj.from;
        this.sentTo = obj.sent_to_user;
        this.fromAdmin = obj.from_admin;
        this.type = obj.type;
        this.caption = obj.caption;
        this.replyToMessageId = obj.reply_to_message_id;
        this.status = obj.status;
        this.chatSettings = obj.chat_settings;
        this.bgColor = obj.bg_color;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.type) obj.type = this.type;
        if (this.date) obj.date = this.date;
        if (this.from) obj.from= this.from.toJsonObject();
        if (this.chat) obj.chat = this.chat.toJsonObject();
        if (this.messageId) obj.message_id = this.messageId;
        if (this.fromAdmin) obj.from_admin = this.fromAdmin;
        if (this.status) obj.status = this.status;
        if (this.sentTo) obj.sent_to = this.sentTo;
        if (this.reference) obj.reference = this.reference;
        if (this.caption) obj.caption = this.caption;
        if (this.replyToMessageId) obj.reply_to_message_id = this.replyToMessageId;
        if (this.text) obj.text = this.text;
        if (this.location) obj.location = this.location;
        if (this.contact) obj.contact = this.contact;
        if (this._document) obj.document = this._document;
        if (this.photo) obj.photo = this.photo.toJsonObject();
        if (this.gif) obj.gif = this.gif.toJsonObject();
        if (voice) obj.voice = voice.toJsonObject();
        if (this.video) obj.video = this.video.toJsonObject();
        if (audio) obj.audio = audio.toJsonObject();
        if (this.sticker) obj.sticker = this.sticker.toJsonObject();
        if (textFile) obj.text_file = textFile.toJsonObject();
        if (this.bgColor) obj.bg_color = this.bgColor;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }

    isMsgWithType = (msgType) => (msgType == this.type);

    isVideoMsg = () => this.isMsgWithType("video");
    isTextMsg = () => this.isMsgWithType("text");
    isPhotoMsg = () => this.isMsgWithType("photo");
    isAudioMsg = () => this.isMsgWithType("audio");
    isLocationMsg = () => this.isMsgWithType("location");
    isVoiceMsg = () => this.isMsgWithType("voice");
    isGifMsg = () => this.isMsgWithType("gif");
    isStickerMsg = () => this.isMsgWithType("sticker");
    isTextFileMsg = () => this.isMsgWithType("text_file");
    isDocumentMsg = () => this.isMsgWithType("document");
    isContactMsg = () => this.isMsgWithType("contact");


}