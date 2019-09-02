const Thumbnail = require("../data/Thumbnail");
/**
 * This class represents incoming Message used to get Video Message .
 *
 * @author Ahmed A. El-Malatawy @author Amir
 *
 */
module.exports = class Video {

    constructor(obj) {
        this.id = obj.id;
        this.width = obj.width;
        this.height = obj.height;
        this.size = obj.size;
        this.thumbnail = obj.thumbnail ? new Thumbnail(obj.thumbnail) : null;
        this.duration = obj.duration;
    }

    toJsonObject(){
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.width) obj.width = this.width;
        if (this.height) obj.height = this.height;
        if (this.size) obj.size = this.size;
        if (this.thumbnail) obj.size = this.size;
        if (this.duration) obj.duration = this.duration;

        return obj;
    }
}