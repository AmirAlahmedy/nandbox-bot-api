import OutMessage from "./OutMessage";
import Chat from "../data/Chat";

export default class SetChatOutMessage extends OutMessage {
    chat = new Chat();

    constructor() {
        this.method = "setChat";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        obj.chat = this.chat;

        return obj;
    }
}