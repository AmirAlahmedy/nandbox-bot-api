import Chat from "../data/Chat";

export default class ChatDetails {
    chat;

    constructor(obj) {
        this.chat = new Chat(obj.chat);
    }

    toJsonObject = () => {
        let obj;

        if (chat) obj.chat = chat.toJsonObject();

        return obj;
    }
}