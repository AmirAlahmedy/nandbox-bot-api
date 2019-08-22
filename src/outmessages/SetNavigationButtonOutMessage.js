"use strict";
import OutMessage from "./OutMessage";
import Button from "../data/Button";

export default class SetNavigationButtonOutMessage extends OutMessage {

    navigationButton = new Button();

    constructor() {
        this.method = this.OutMessageMethod.setNavigationButton;
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (navigationButton)
            obj.navigation_button= navigationButton.toJsonObject();

        return obj;
    }
}