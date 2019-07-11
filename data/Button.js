"use strict";

export default class Button {

    static KEY_BUTTON_SPAN = "button_span";
	static KEY_BUTTON_ORDER = "button_order";
    static KEY_BUTTON_TEXT_COLOR = "button_textcolor";
	static KEY_BUTTON_BG_COLOR = "button_bgcolor";
	static KEY_BUTTON_CALLBACK = "button_callback";
	static KEY_BUTTON_LABEL = "button_label";
	static KEY_BUTTON_URL = "button_url";
	static KEY_BUTTON_QUERY = "button_query";
	static KEY_NEXT_MENU = "next_menu";
	static KEY_CHAT = "chat";
	static KEY_BUTTON_ICON = "button_icon";
	static KEY_BUTTON_ICON_BG_COLOR = "button_icon_bgcolor";	
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
            
            this.buttonOrder = obj.KEY_BUTTON_ORDER;
            this.buttonSpan = obj.KEY_BUTTON_SPAN;
            this.buttonTextColor = obj.KEY_BUTTON_TEXT_COLOR;
            this.buttonBgColor = obj.KEY_BUTTON_BG_COLOR;
            this.buttonCallBack = obj.KEY_BUTTON_CALLBACK;
            this.buttonLabel = obj.KEY_BUTTON_LABEL;
            this.buttonURL = obj.KEY_BUTTON_URL;
            this.buttonQuery = obj.KEY_BUTTON_QUERY;
            this.nextMenu = obj.KEY_NEXT_MENU;
            this.chat = obj.KEY_CHAT;
            this.buttonIcon = obj.KEY_BUTTON_ICON;
            this.buttonIconBgColor = obj.KEY_BUTTON_ICON_BG_COLOR;

            return;
        }

        // TODO: else ?
    }

    toJsonObject = () => {
        let obj = {};

        if(this.buttonOrder) obj.KEY_BUTTON_ORDER = this.buttonOrder;
        if(this.buttonSpan) obj.KEY_BUTTON_SPAN = this.buttonSpan;
        if(this.buttonTextColor) obj.KEY_BUTTON_TEXT_COLOR = this.buttonTextColor;
        if(this.buttonBgColor) obj.KEY_BUTTON_BG_COLOR = this.buttonBgColor;
        if(this.buttonCallBack) obj.KEY_BUTTON_CALLBACK = this.KEY_BUTTON_CALLBACK;
        if(this.buttonLabel) obj.KEY_BUTTON_LABEL = this.KEY_BUTTON_LABEL;
        if(this.buttonURL) obj.KEY_BUTTON_URL = this.buttonURL;
        if(this.buttonQuery) obj.KEY_BUTTON_QUERY = this.buttonQuery;
        if(this.nextMenu) obj.KEY_NEXT_MENU = this.nextMenu;
        if(this.chat) obj.KEY_CHAT = this.chat;
        if(this.buttonIcon) obj.KEY_BUTTON_ICON = this.buttonIcon;
        if(this.buttonBgColor) obj.KEY_BUTTON_BG_COLOR = this.buttonBgColor;

        return obj;
    }

   

}