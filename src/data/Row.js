"use strict";
import Button from "./Button";

export default class Row {

    buttons = [];
    rowOrder;

    constructor(buttons, option) {
        if (option === 1) {
            this.buttons = buttons;
            return;
        } else if (option === 2) {
            let button = buttons;
            this.buttons = new Button({ button });
            return;
        } else if (option === 3) {
            let obj = buttons;
            let buttonsArrayObj = obj.buttons;
            // TODO: check syntax
            //buttons = new Button[buttonsArrayObj.length];
            for (let i = 0; i < buttonsArrayObj.length; i++) {
                buttons[i] = new Button(buttonsArrayObj[i], 2);
            }
            this.rowOrder = obj.row_order;
            return;
        }
        else if (!buttons && !option) return;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.rowOrder) obj.row_order = this.rowOrder;
        if (this.buttons) {
            let buttonsArrayObjnew = [];
            for (let i = 0; i < this.buttons.length; i++)
                buttonsArrayObjnew[i] = this.buttons[i].toJsonObject();

            obj.buttons = this.buttons;
        }

        return obj;
    }

}