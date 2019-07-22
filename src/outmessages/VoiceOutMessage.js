"use strict";

import OutMessage from "./OutMessage";
/**
 * This class represents Output Message used to send Voice file .
 *
 * @author Ahmed A. El-Malatawy @author Amir
 *
 */
export default class VoiceOutMessage extends OutMessage {
    voice;
    size;

    constructor() {
        this.method = "sendVoice";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.voice) obj.voice = this.voice;
        if (this.size) obj.size = this.size;

        return obj;
    }
}