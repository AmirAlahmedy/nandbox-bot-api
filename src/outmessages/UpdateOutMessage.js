"use strict";

import OutMessage from "./OutMessage";

export default class UpdateOutMessage extends OutMessage {
    messageId;
    text;

    constructor() {
        super();
        this.method = "updateMessage";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.messageId) obj.messageId = this.messageId;
        if (this.text) obj.text = this.text;
        if (this.caption) obj.caption = this.caption;
        if (this.toUserId) obj.to_user_id = this.toUserId;
        if (this.chatId) obj.chat_id = this.chatId;

        return obj; 
    }
}