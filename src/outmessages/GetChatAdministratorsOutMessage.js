"use strict";

import OutMessage from "./OutMessage";

export default class GetChatAdministratorsOutMessage extends OutMessage {
    constructor() {
        super();
        this.method = "getChatAdministrators";
    }
}