"use strict";
import Button from "./Button";

export default class Row {
    static KEY_BUTTONS = "buttons";
    static KEY_ROW_ORDER = "row_order";

    buttons;
    rowOrder;

    constructor(buttons, option) {
        if (option === 1) {
            this.buttons = buttons;
            return;
        } else if (option === 2) {
            let button = buttons;
            setButton(button);
            return;
        } else if (option === 3) {
            let obj = buttons;
            let buttonsArrayObj =  obj.KEY_BUTTONS;
            // TODO: check syntax
            buttons = new Button[buttonsArrayObj.length];
            for (let i = 0; i < buttonsArrayObj.length; i++) {
                buttons[i] = new Button(buttonsArrayObj[i]);
            }
            this.rowOrder = obj.KEY_ROW_ORDER;
            return;
        }
        // TODO: else ?
    }

    toJsonObject = () => {
        let obj = {};

        if (this.rowOrder) obj.KEY_ROW_ORDER = this.rowOrder;
        if (this.buttons) {
            let buttonsArrayObjnew = [];
            for (let i = 0; i < this.buttons.length; i++)
                buttonsArrayObjnew[i] = this.buttons[i].toJsonObject();

            obj.KEY_BUTTONS = this.buttons;
        }

        return obj;
    }

}