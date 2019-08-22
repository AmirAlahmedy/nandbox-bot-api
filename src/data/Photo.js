"use strict";
import Thumbnail from "./Thumbnail";

export default class Photo {
 
    id;
    width;
    height;
    size;
    thumbnail;

    constructor(obj) {

        if(!obj)
            return;
        this.id = obj.id;
        this.width = obj.width;
        this.height = obj.height;
        this.size = obj.size;
        this.thumbnail = obj.thumbnail != null ? new Thumbnail(obj.thumbnail) : null;

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