const OutMessage = require("./OutMessage");

module.exports = class RecallOutMessage extends OutMessage {


    constructor() {
        super();
        this.method = "recallMessage";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.messageId) obj.message_id = this.messageId;
        if (this.fromUserId) obj.from_user_id = this.fromUserId;

        return obj;
    }
}