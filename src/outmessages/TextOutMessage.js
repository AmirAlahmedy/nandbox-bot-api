"use strict";
import OutMessage from "./OutMessage";

export default class TextOutMessage extends OutMessage {

    text;
    bg_color;

    constructor() {
        super();
        this.method = "sendMessage"; 
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (this.text)
            obj.text = this.text;
        if (this.bg_color)
            obj.bg_color = this.bg_color;
        return obj;
    }
}