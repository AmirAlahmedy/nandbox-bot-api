"use strict";
export default class Thumbnail {
	id;
	width;
	height;

    constructor(obj){
        this.id = obj.id;
		this.width = obj.width;
        this.height = obj.height;
    }

    toJsonObject = () => {
        let obj = {};

        if(this.id) obj.id = this.id;
        if(this.width) obj.width = this.width;
        if(this.height) obj.height = this.height;

        return obj;
    }

    getId = () => this.id;
    setId = id => {this.id = id;}
    getWidth = () => this.width;
    setWidth = width => {this.width = width;}
    getHeight = () => this.height;
    setHeigth = height => {this.height = height;}

}