import OutMessage from "./OutMessage";

export default class VideoOutMessage extends OutMessage {
    video;

    constructor() {
        super();
        this.method = "sendVideo";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (video != null) {
            obj.video = video;
        }
        return obj;
    }
}