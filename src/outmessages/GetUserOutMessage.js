"use strict";

import OutMessage from "./OutMessage";

export default class GetUserOutMessage extends OutMessage {
    userId;

    constructor() {
        this.method = "getUser";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        
        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}