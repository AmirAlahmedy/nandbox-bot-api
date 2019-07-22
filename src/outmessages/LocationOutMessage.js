"use strict"

import OutMessage from "./OutMessage";

export default class LocationOutMessage extends OutMessage {
    longitude;
    latitude;
    name;
    details;

    constructor() {
        this.method = "sendLocation";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();

        if (this.name) obj.name = this.name;
        if (this.details) obj.details = this.details;
        if (this.latitude) obj.latitude = this.latitude;
        if (this.longitude) obj.longitude = this.longitude;

        return obj;
    }
}