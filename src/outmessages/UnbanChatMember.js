"use strict";

const OutMessage = require("./OutMessage");

module.exports = class UnbanChatMember extends OutMessage {

    constructor() {
        super();
        this.method = "unbanChatMember";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.chatId) obj.chat_id = this.chatId;
        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}