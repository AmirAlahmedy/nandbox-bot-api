const Thumbnail = require("../data/Thumbnail");
/**
 * @author Hossam @author Amir
 *
 */
module.exports = class Sticker {
    constructor(obj) {
        this.id = obj.id;
        this.width = obj.width;
        this.height = obj.height;
        this.size = obj.size;
        this.thumbnail = obj.thumbnail ? new Thumbnail(obj.thumbnail) : null;
    }

    toJsonObject(){
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.width) obj.width = this.width;
        if (this.height) obj.height = this.height;
        if (this.size) obj.size = this.size;
        if (this.thumbnail) obj.thumbnail = this.thumbnail;

        return obj;
    }

}