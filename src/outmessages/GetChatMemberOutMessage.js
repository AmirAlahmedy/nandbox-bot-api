"use strict";

const OutMessage = require("./OutMessage");

module.exports = class GetChatMemberOutMessage extends OutMessage {
   

    constructor() {
        super();
        this.method = "getChatMember";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.chatId) obj.chat_id = this.chatId;
        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}