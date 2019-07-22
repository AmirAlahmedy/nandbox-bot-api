"use strict";

import OutMessage from "./OutMessage";

export default class BanChatMemberOutMessage extends OutMessage {
    userId;

    constructor() {
        this.method = "banChatMember";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}