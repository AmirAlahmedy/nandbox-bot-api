"use strict";

module.exports = class Row {



    constructor(buttons, rowOrder = 1) {
        this.row_order = rowOrder;
        this.buttons = [];
        if (buttons) 
            for (let i = 0; i < buttons.length; i++)
                this.buttons.push(buttons[i]);
        
        return;
    }

    toJsonObject(){
        let obj = {};

        if (this.row_order) obj.row_order = this.row_order;
        if (this.buttons) {
            let buttonsArrayObjnew = [];
            for (let i = 0; i < this.buttons.length; i++)
                buttonsArrayObjnew[i] = this.buttons[i].toJsonObject();

            obj.buttons = this.buttons;
        }

        return obj;
    }

}