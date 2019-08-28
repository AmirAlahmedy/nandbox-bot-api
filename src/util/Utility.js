"use strict";
import Button from "../data/Button";
import SetNavigationButtonOutMessage from "../outmessages/SetNavigationButtonOutMessage";
import { Api } from "../NandBox";

class Utils {

    // enum
    MediaType = Object.freeze({ text: 0, image: 1, video: 2, audio: 3, file: 4, voice: 5, textFile: 6, contact: 7, location: 8, gif_video: 9, gif_image: 10, sticker: 11, article: 12 });


    static formatDurationInMinsAndSeconds = duration => {
        let durationInMinsAndSeconds = null;

        if (duration != null) {
            let seconds = duration / 1000;
            let minutes = seconds / 60;
            durationInMinsAndSeconds = minutes + " min, " + seconds + "sec";
        }

        return durationInMinsAndSeconds;
    }

    setNavigationButton = (chatId, nextMenu, api) => {
        let fb = new Button();
        fb.next_menu = nextMenu;
        let navMsg = new SetNavigationButtonOutMessage();
        navMsg.chat_id = chatId;
        navMsg.navigation_button = fb;

        api.send(JSON.stringify(navMsg));
    }

    static isNotEmpty = string => !("" === string);

    static toArrayBuffer = buffer => {
        let ab = new ArrayBuffer(buffer.length);
        let view = new Uint8Array(ab);
        for (let i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return ab;
    }
    // TODO: complete

}




var length = 14;
var timestamp = +new Date;

var _getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generate = () => {
    var ts = timestamp.toString();
    var parts = ts.split("").reverse();
    var id = "";

    for (var i = 0; i < length; ++i) {
        var index = _getRandomInt(0, parts.length - 1);
        id += parts[index];
    }

    return Number(id);
}




export {
    Utils as Utility,
    generate as Id,
}