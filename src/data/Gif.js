import Thumbnail from "../data/Thumbnail";
/**
 * This class represents incoming Message used to get Gif Message .
 *
 * @author Ahmed A. El-Malatawy @Amir
 *
 */
export default class Gif {
    id;
    width;
    height;
    size;
    thumbnail;

    constructor(obj) {
        this.id = obj.id;           
                                    // TODO: check
                                    Utils.getInteger(obj.get(KEY_WIDTH));
                                    Utils.getInteger(obj.get(KEY_HEIGHT));
                                    Utils.getLong(obj.get(KEY_SIZE));
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