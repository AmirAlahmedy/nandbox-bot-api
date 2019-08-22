"use strict";
import OutMessage from "./OutMessage";
/**
 * This class represents Output Message used to send Photo file .
 *
 * @author Ahmed A. El-Malatawy @author Amir
 *
 */
export default class PhotoOutMessage extends OutMessage{
    photo;

    constructor() {
        super();
        this.method = "sendPhoto";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        
        if (this.photo) obj.photo = this.photo;

        return obj;
    }
}