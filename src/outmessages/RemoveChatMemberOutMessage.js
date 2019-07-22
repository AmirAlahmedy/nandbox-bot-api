import OutMessage from "./OutMessage";

export default class RemoveChatMemberOutMessage extends OutMessage {
    userId;

    constructor() {
        this.method = "removeChatMember";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.chatId) obj.chat_id = this.chatId;
        if (this.userId) obj.user_id = this.userId;

        return obj;
    }
}