"use strict";
module.exports = class Thumbnail {

    constructor(obj){
        this.id = obj.id;
		this.width = obj.width;
        this.height = obj.height;
    }

    toJsonObject(){
        let obj = {};

        if(this.id) obj.id = this.id;
        if(this.width) obj.width = this.width;
        if(this.height) obj.height = this.height;

        return obj;
    }

}