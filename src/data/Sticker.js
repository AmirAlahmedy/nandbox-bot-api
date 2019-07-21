import Thumbnail from "../data/Thumbnail";
/**
 * @author Hossam @author Amir
 *
 */
export default class Sticker {
    id;
    width;
    height;
    size;
    thumbnail;

    constructor(obj) {
        this.id = obj.id;
        // TODO: check
        /* this.width = Utils.getInteger(obj.get(KEY_WIDTH));
        this.height = Utils.getInteger(obj.get(KEY_HEIGHT));
        this.size = Utils.getLong(obj.get(KEY_SIZE)); */
        this.width = obj.width;
        this.height = obj.height;
        this.size = obj.size;
        this.thumbnail = obj.thumbnail ? new Thumbnail(obj.thumbnail) : null;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.width) obj.width = this.width;
        if (this.height) obj.height = this.height;
        if (this.size) obj.size = this.size;
        if (this.thumbnail) obj.thumbnail = this.thumbnail;

        return obj;
    }

}