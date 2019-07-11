"use strict";
import User from "../data/User";

/** 
 * it represents Incoming message Object , the incoming message Object is
 * representing Server Messages with method : message
*/
export default class IncomingMessage {

    Messaype = Object.freeze({ text: 0, photo: 1, video: 2, audio: 3, voice: 4, contact: 5, location: 6, gif: 7, document: 8, text_file: 9, sticker: 10 });

    static KEY_MESSAGE = "message";
    static KEY_MESSAGE_ID = "message_id";
    static KEY_TYPE = "type";
    static KEY_FROM_ADMIN = "from_admin";
    static KEY_DATE = "date";
    static KEY_TEXT = "text";
    static KEY_LOCATION = "location";
    static KEY_CONTACT = "contact";
    static KEY_DOCUMENT = "document";
    static KEY_FROM = "from";
    static KEY_CHAT = "chat";
    static KEY_REFERENCE = "reference";
    static KEY_SENT_TO = "sent_to";
    static KEY_PHOTO = "photo";
    static KEY_GIF = "gif";
    static KEY_VIDEO = "video";
    static KEY_AUDIO = "audio";
    static KEY_VOICE = "voice";
    static KEY_CAPTION = "caption";
    static KEY_STICKER = "sticker";
    static KEY_REPLAY_TO_MESSAGE_ID = "reply_to_message_id";
    static KEY_TEXT_FILE = "text_file";
    static KEY_STATUS = "status";
    static KEY_CHAT_SETTINGS = "chat_settings";
    static KEY_BG_COLOR = "bg_color";

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

        obj = jsonObj.KEY_MESSAGE;

        let fromUser = new User(obj.KEY_FROM);
        let sentToUser = obj.KEY_SENT_TO ? new User(obj.KEY_SENT_TO) : null;

        this.chat = obj.KEY_CHAT == null ? null : new Chat(obj.KEY_CHAT);

        // TODO: check the following assignments

        // this.location = obj.KEY_LOCATION ? new Location(obj.KEY_LOCATION) : null;
        // this.contact = obj.KEY_CONTACT ? new Contact(obj.KEY_CONTACT) : null;
        // this.document = obj.KEY_DOCUMENT ? new Document(obj.KEY_DOCUMENT) : null;
        this.photo = obj.KEY_PHOTO ? new Photo(obj.KEY_PHOTO) : null;
        // this.gif = obj.KEY_GIF ? new Gif(objKEY_GIF) : null;
        // this.voice = obj.KEY_VOICE ? new Voice(obj.KEY_VOICE) : null;
        // this.video = obj.KEY_VIDEO ? new Video(obj.KEY_VIDEO) : null;
        // this.audio = obj.KEY_AUDIO ? new Audio(obj.KEY_AUDIO) : null;
        //this.sticker = obj.KEY_STICKER ? new Sticker(obj.KEY_STICKER) : null;
        //this.textFile = obj.KEY_TEXT_FILE ? new TextFile(obj.KEY_TEXT_FILE) : null;
        this.text = obj.KEY_TEXT;
        this.messageId = obj.KEY_MESSAGE_ID;
        this.date = obj.KEY_DATE;
        this.reference = obj.KEY_REFERENCE;
        this.from = fromUser;
        this.sentTo = sentToUser;
        //TODO: check
        this.fromAdmin = obj.KEY_FROM_ADMIN;
        this.type = obj.KEY_TYPE;
        this.caption = obj.KEY_CAPTION;
        this.replyToMessageId = obj.KEY_REPLAY_TO_MESSAGE_ID;
        this.status = obj.KEY_STATUS;
        // TODO: check 
        this.chatSettings = obj.KEY_CHAT_SETTINGS;
        this.bgColor = obj.KEY_BG_COLOR;
    }

    toJsonObject = () => {
        let obj = {};

        // TODO: complete
        if (type) obj.KEY_TYPE = type;
        if (date) obj.KEY_DATE = date;
        if (from) obj.KEY_FROM = from.toJsonObject();
        if (chat) obj.KEY_CHAT = chat.toJsonObject();
        if (messageId) obj.KEY_MESSAGE_ID = messageId;
        if (fromAdmin) obj.KEY_FROM_ADMIN, fromAdmin;
        if (status) obj.KEY_STATUS = status;
        if (sentTo) obj.KEY_SENT_TO = sentTo;
        if (reference) obj.KEY_REFERENCE = reference;
        if (caption) obj.KEY_CAPTION = caption;
        if (replyToMessageId) obj.KEY_REPLAY_TO_MESSAGE_ID = replyToMessageId;
        if (text) obj.KEY_TEXT = text;
        // if (location) obj.KEY_LOCATION = location;
        if (contact) obj.KEY_CONTACT = contact;
        //if (_document) obj.KEY_DOCUMENT = _document;
        if (photo) obj.KEY_PHOTO = photo.toJsonObject();
        if (gif) obj.KEY_GIF = gif.toJsonObject();
        //if (voice) obj.KEY_VOICE = voice.toJsonObject();
        //if (video) obj.KEY_VIDEO = video.toJsonObject();
        //if (audio) obj.KEY_AUDIO = audio.toJsonObject();
        //if (sticker) obj.KEY_STICKER = sticker.toJsonObject();
        //if (textFile) obj.KEY_TEXT_FILE = textFile.toJsonObject();
        if (bgColor) obj.KEY_BG_COLOR = bgColor;

        console.log("to " + obj.toJSONString());
        return obj;

    }
}