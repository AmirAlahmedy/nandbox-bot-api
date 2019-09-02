"use strict";
const OutMessage = require("./OutMessage");

module.exports = class GetUserOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "getUser";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}