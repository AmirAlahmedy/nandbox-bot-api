"use strict";
import OutMessage from "./OutMessage";

export default class TextOutMessage extends OutMessage {

    text;
    bgColor;

    constructor() {
        super();
        this.method = this.OutMessageMethod.sendMessage;
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (this.text)
            obj.text = this.text;
        if (this.bgColor)
            obj.bg_color = this.bgColor;
        return obj;
    }
}