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

    message_id;
    type;
    date;
    reference;
    from = new User();
    reply_to_message_id;
    caption;
    from_admin;
    chat = new Chat();
    text;
    location;
    contact;
    sent_to = new User();
    photo = new Photo();
    gif;
    voice;
    video;
    audio;
    document;
    sticker;
    text_file;
    status;
    chat_settings;
    bg_color;

    constructor(jsonObj) {
        let obj = {};

        obj = jsonObj.message;

        /* let fromUser = new User(obj.from);
        console.log(obj.sent_to);
        let sent_toUser = obj.sent_to ? new User(obj.sent_to) : null;
        console.log(sent_toUser); */
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
    }

    toJsonObject = () => {
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
        if (voice) obj.voice = voice.toJsonObject();
        if (this.video) obj.video = this.video.toJsonObject();
        if (audio) obj.audio = audio.toJsonObject();
        if (this.sticker) obj.sticker = this.sticker.toJsonObject();
        if (text_file) obj.text_file = text_file.toJsonObject();
        if (this.bg_color) obj.bg_color = this.bg_color;

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