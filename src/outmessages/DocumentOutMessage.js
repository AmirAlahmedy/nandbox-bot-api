"use strict";

import OutMessage from "./OutMessage";
/**
 * This class represents Output Message used to send Document file .
 *
 * @author Ahmed A. El-Malatawy @author Amir
 *
 */
export default class DocumentOutMessage extends OutMessage {
    _document;
    name;
    size;

    constructor() {
        this.method = "sendDocument";
    }

    toJsonObject = () => {
        let obj = {};

        if (this._document) obj.document = this._document;
        if (this.name) obj.name = this.name;
        if (this.size) obj.size = this.size;

        return obj;
    }
} 