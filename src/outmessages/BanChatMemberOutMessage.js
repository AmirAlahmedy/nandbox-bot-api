"use strict";

const OutMessage = require("./OutMessage");

module.exports = class BanChatMemberOutMessage extends OutMessage {
    

    constructor() {
        super();
        this.method = "banChatMember";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}