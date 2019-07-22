import OutMessage from "./OutMessage";

export default class GetMyProfiles extends OutMessage{
    constructor() {
        this.method = "getMyProfiles";
    }
}