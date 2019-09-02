"use strict";
const OutMessage = require("./OutMessage");
const Button = require("../data/Button");

module.exports = class SetNavigationButtonOutMessage extends OutMessage {

    constructor() {
        super();
        this.method = "setNavigationButton";
    }

    toJsonObject(){
        let obj = super.toJsonObject();
        if (navigation_button)
            obj.navigation_button= navigation_button.toJsonObject();

        return obj;
    }
}