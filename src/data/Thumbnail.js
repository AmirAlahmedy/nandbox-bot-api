"use strict";
export default class Thumbnail {

    static KEY_ID = "id";
	static KEY_WIDTH = "width";
	static KEY_HEIGHT = "height";

	id;
	width;
	height;

    constructor(jsonobj){

        this.id = obj.KEY_ID;
		this.width = obj.KEY_WIDTH;
        this.height = obj.KEY_HEIGHT;
        
    }

    toJsonObject = () => {
        let obj = {};

        if(this.id) obj.KEY_ID = this.id;
        if(this.width) obj.KEY_WIDTH = this.width;
        if(this.height) obj.KEY_HEIGHT = this.height;

        return obj;
    }

    getId = () => this.id;
    setId = id => {this.id = id;}
    getWidth = () => this.width;
    setWidth = width => {this.width = width;}
    getHeight = () => this.height;
    setHeigth = height => {this.height = height;}

}