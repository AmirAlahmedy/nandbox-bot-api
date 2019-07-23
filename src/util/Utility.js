"use strict";
import Button from "../data/Button";
import SetNavigationButtonOutMessage from "../outmessages/SetNavigationButtonOutMessage";
import { Api } from "../NandBox";

class Utils {

    // enum
    MediaType = Object.freeze({ text: 0, image: 1, video: 2, audio: 3, file: 4, voice: 5, textFile: 6, contact: 7, location: 8, gif_video: 9, gif_image: 10, sticker: 11, article: 12 });


    static formatDurationInMinsAndSeconds = duration => {
        durationInMinsAndSeconds = null;

        if (duration != null) {
            seconds = duration / 1000;
            minutes = seconds / 60;
            durationInMinsAndSeconds = minutes + " min, " + seconds + "sec";
        }

        return durationInMinsAndSeconds;
    }

    setNavigationButton = (chatId, nextMenu, api) => {
        fb = new Button();
        fb.nextMenu = nextMenu;
        navMsg = new SetNavigationButtonOutMessage();
        navMsg.chatId = chatId;
        navMsg.navigationButton = fb;

        api = new Api();
        api.send(navMsg);
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

    return id;
}



export {
    Utils as Utility,
    generate as Id
}