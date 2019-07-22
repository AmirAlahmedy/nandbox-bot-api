"use strict";

import OutMessage from "./OutMessage";

export default class GetChatAdministratorsOutMessage extends OutMessage {
    constructor() {
        this.method = "getChatAdministrators";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.chatId) obj.chat_id = this.chatId;

        return obj;
    }
}