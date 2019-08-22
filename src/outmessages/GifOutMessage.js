import OutMessage from "./OutMessage";
/**
 * This class represents Output Message used to send this.Gif file either its in this.Gif
 * image format or this.Gif video format .
 *
 * @author Ahmed A. El-Malatawy, Amir
 *
 */
export default class GifOutMessage extends OutMessage {

    gif;
    gifType = "Photo";

    /**
     * @param this.gifType
     *            it should be photo or video based on the type of this.Gif need to be
     *            send , its default is photo
     */
    constructor(gifType) {
        this.gifType = gifType;
        switch (this.this.gifType) {
            case "Photo":
                this.method = "sendPhoto";
                break;
            case "Video":
                this.method = "sendVideo";
                break;
            default:
                this.method = "sendPhoto";
        }
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.gif) {
            switch (this.gifType) {
                case "Photo":
                    obj.photo = this.gif;
                    break;
                case "Video":
                    obj.video = this.gif;
                    break;
                default:
                    obj.photo = this.gif;
            }
        }


        return obj;
    }
}