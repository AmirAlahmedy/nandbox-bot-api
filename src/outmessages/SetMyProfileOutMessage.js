import OutMessage from "./OutMessage";
import User from "../data/User";

export default class SetMyProfileOutMessage extends OutMessage {
    user = new User();

    constructor() {
        this.method = "setMyProfile";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        obj.user = this.user;

        return obj;
    }
}