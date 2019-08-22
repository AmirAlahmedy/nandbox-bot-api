"use strict";
import OutMessage from "./OutMessage";
import Button from "../data/Button";

export default class SetNavigationButtonOutMessage extends OutMessage {

    navigation_button = new Button();

    constructor() {
        super();
        this.method = "setNavigationButton";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (navigation_button)
            obj.navigation_button= navigation_button.toJsonObject();

        return obj;
    }
}