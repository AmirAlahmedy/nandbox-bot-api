"use strict";
import Thumbnail from "./Thumbnail";

export default class Photo {
    static KEY_ID = "id";
    static KEY_WIDTH = "width";
    static KEY_HEIGHT = "height";
    static KEY_SIZE = "size";
    static KEY_THUMBNAIL = "thumbnail";

    id;
    width;
    height;
    size;
    thumbnail;

    constructor(obj) {

        if(!obj)
            return;
        this.id = obj.KEY_ID;
        this.width = obj.KEY_WIDTH;
        this.height = obj.getKEY_HEIGHT;
        this.size = obj.KEY_SIZE;
        this.thumbnail = obj.KEY_THUMBNAIL != null ? new Thumbnail(obj.KEY_THUMBNAIL) : null;

    }

    toJsonObject = () => {
        let obj = {};

        if (this.id) obj.KEY_ID = this.id;
        if (this.width) obj.KEY_WIDTH = this.width;
        if (this.height) obj.KEY_HEIGHT = this.height;
        if (this.size) obj.KEY_SIZE = this.size;
        if (this.thumbnail) obj.KEY_THUMBNAIL = this.thumbnail;

        return obj;

    }

/*  getId = () => this.id;
    setID = id => { this.id = id; }
    getWidth = () => this.width;
    setWidth = width => { this.width; }
    getHeight = () => this.height;
    setHeight = height => { this.height = height; }
    getSize = () => this.size;
    setSize = size => { this.size = size; }
    getThumbnail = () => this.thumbnail;
    setThumbnail = thumbnail => { this.thumbnail = thumbnail; } */

}