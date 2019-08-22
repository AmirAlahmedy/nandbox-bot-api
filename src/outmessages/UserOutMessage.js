import OutMessage from "./OutMessage";

export default class UserOutMessage extends OutMessage {
    constructor() {
        this.method = "sendMessage";
    }
}