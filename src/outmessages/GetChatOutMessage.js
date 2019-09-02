"use strict";

const OutMessage = require("./OutMessage");

module.exports = class GetChatOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "getChat";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.chatId) obj.chat_id = this.chatId;

        return obj;
    }
}