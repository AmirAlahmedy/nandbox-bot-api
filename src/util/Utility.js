"use strict";
import Button from "../data/Button";
import SetNavigationButtonOutMessage from "../outmessages/SetNavigationButtonOutMessage";
import { Api } from "../NandBox";
import * as uuid from 'uuid/v4';

export default class Utils {

    // enum
    MediaType = Object.freeze({ text: 0, image: 1, video: 2, audio: 3, file: 4, voice: 5, textFile: 6, contact: 7, location: 8, gif_video: 9, gif_image: 10, sticker: 11, article: 12 });

    // TODO: alternative to atomic integer

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

    getUniqueId = () => uuid();
    
    // TODO: complete

}