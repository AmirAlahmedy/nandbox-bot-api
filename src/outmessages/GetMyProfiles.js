import OutMessage from "./OutMessage";

export default class GetMyProfiles extends OutMessage{
    constructor() {
        super();
        this.method = "getMyProfiles";
    }
}