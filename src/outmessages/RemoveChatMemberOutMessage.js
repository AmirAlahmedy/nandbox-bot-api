const OutMessage = require("./OutMessage");

module.exports = class RemoveChatMemberOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "removeChatMember";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.chatId) obj.chat_id = this.chatId;
        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}