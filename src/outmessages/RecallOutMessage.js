import OutMessage from "./OutMessage";

export default class RecallOutMessage extends OutMessage {

    messageId;
    fromUserId;

    constructor() {
        super();
        this.method = "recallMessage";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.messageId) obj.message_id = this.messageId;
        if (this.fromUserId) obj.from_user_id = this.fromUserId;

        return obj;
    }
}