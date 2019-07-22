"use strict";

import OutMessage from "./OutMessage";
/**
 * This class represents Output Message used to send Audio file .
 *
 * @author Ahmed A. El-Malatawy
 *
 */
export default class AudioOutMessage extends OutMessage {
    audio;
    performer;
    title;

    constructor() {
        this.method = "sendAudio";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.audio) obj.audio = this.audio;
        if (this.performer) obj.performer = this.performer;
        if (this.title) obj.title = this.title;

        return obj;
    }
}