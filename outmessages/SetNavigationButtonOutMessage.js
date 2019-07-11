"use strict";
import OutMessage from "./OutMessage";
import Button from "./Button";

export default class SetNavigationButtonOutMessage extends OutMessage {

    static KEY_NAVIGATION_BUTTON = "navigation_button";
    navigationButton = new Button();

    constructor() {
        this.method = this.OutMessageMethod.setNavigationButton;
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (navigationButton)
            obj.KEY_NAVIGATION_BUTTON = navigationButton.toJsonObject();

        return obj;
    }
}