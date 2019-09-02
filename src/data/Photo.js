"use strict";
const Thumbnail = require("./Thumbnail");

module.exports = class Photo {
 
    constructor(obj) {

        if(!obj)
            return;
        this.id = obj.id;
        this.width = obj.width;
        this.height = obj.height;
        this.size = obj.size;
        this.thumbnail = obj.thumbnail != null ? new Thumbnail(obj.thumbnail) : null;

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