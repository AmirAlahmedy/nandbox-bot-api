import OutMessage from "./OutMessage";

export default  class GeneratePermanentUrl extends OutMessage {
    file;
    param1;

    constructor() {
        this.method = "generatePermanentUrl";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.file) obj.file = this.file;
        if (this.param1) obj.param1 = this.param1;

        return obj;
    }
}