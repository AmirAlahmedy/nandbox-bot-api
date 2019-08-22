"use strict";

export default class Button {

	static BUTTON_QUERY_LOCATION = "location";
	static BUTTON_QUERY_CONTACT = "contact";

    buttonSpan;
    buttonOrder;
    buttonTextColor;
    buttonBgColor;
    buttonCallBack;
    buttonLabel;
    buttonURL;
    buttonQuery;
    nextMenu;
    chat;
    buttonIcon;
    buttonIconBgColor;

    // TODO: handle multiple constructors
    constructor(buttonLable, option){
        if(!buttonLable && !option){
            return;
        }
        else if(option === 1){
            this.buttonLabel = buttonLable;
            return;
        } else if (option === 2){
            let obj = buttonLable;
            
            this.buttonOrder = obj.button_order;
            this.buttonSpan = obj.button_span;
            this.buttonTextColor = obj.button_textcolor;
            this.buttonBgColor = obj.button_bgcolor;
            this.buttonCallBack = obj.button_callback;
            this.buttonLabel = obj.button_label;
            this.buttonURL = obj.button_url;
            this.buttonQuery = obj.button_query;
            this.nextMenu = obj.next_menu;
            this.chat = obj.chat;
            this.buttonIcon = obj.button_icon;
            this.buttonIconBgColor = obj.button_icon_bgcolor;

            return;
        }

        // TODO: else ?
    }

    toJsonObject = () => {
        let obj = {};

        if(this.buttonOrder) obj.button_order = this.buttonOrder;
        if(this.buttonSpan) obj.button_span = this.buttonSpan;
        if(this.buttonTextColor) obj.button_textcolor = this.buttonTextColor;
        if(this.buttonBgColor) obj.button_bgcolor = this.buttonBgColor;
        if(this.buttonCallBack) obj.button_callback = this.button_callback;
        if(this.buttonLabel) obj.button_label = this.button_label;
        if(this.buttonURL) obj.button_url = this.buttonURL;
        if(this.buttonQuery) obj.button_query = this.buttonQuery;
        if(this.nextMenu) obj.next_menu = this.nextMenu;
        if(this.chat) obj.chat = this.chat;
        if(this.buttonIcon) obj.button_icon = this.buttonIcon;
        if(this.buttonBgColor) obj.button_bgcolor = this.buttonBgColor;

        return obj;
    }
}