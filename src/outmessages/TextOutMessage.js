"use strict";
import OutMessage from "./OutMessage";

export default class TextOutMessage extends OutMessage {
    static KEY_TEXT = "text";
    static KEY_BG_COLOR = "bg_color";
    text;
    bgColor;

    constructor() {
        this.method = this.OutMessageMethod.sendMessage;
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (this.text)
            obj.KEY_TEXT = this.text;
        if (this.bgColor)
            obj.KEY_BG_COLOR = this.bgColor;
        return obj;
    }
}