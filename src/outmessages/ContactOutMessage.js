"use strict";

import OutMessage from "./OutMessage";

/**
 *
 * This class represents Output Message used to send Contact Message .
 *
 * @author Ahmed A. El-Malatawy @author Amir
 *
 */
export default class ContactOutMessage extends OutMessage {
    name;
    phoneNumber;

    constructor() {
        this.method = "sendContact";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.name) obj.name = this.name;
        if (this.phoneNumber) obj.phoneNumber = this.phoneNumber;

        return obj;
    }
} 