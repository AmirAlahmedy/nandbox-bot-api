"use strict";

const OutMessage = require("./OutMessage");

module.exports = class UpdateOutMessage extends OutMessage {
    constructor() {
        super();
        this.method = "updateMessage";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.messageId) obj.messageId = this.messageId;
        if (this.text) obj.text = this.text;
        if (this.caption) obj.caption = this.caption;
        if (this.toUserId) obj.to_user_id = this.toUserId;
        if (this.chatId) obj.chat_id = this.chatId;

        return obj; 
    }
}