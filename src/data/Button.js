"use strict";

export default class Button {

	static BUTTON_QUERY_LOCATION = "location";
	static BUTTON_QUERY_CONTACT = "contact";

    button_span;
    button_order;
    button_textcolor;
    button_bgcolor;
    button_callback;
    button_label;
    button_url;
    button_query;
    next_menu;
    chat;
    button_icon;
    button_icon_bgcolor;

    // TODO: handle multiple constructors
    constructor(obj, option){
        if(option === 1){
            this.button_label = obj;
        } else if (option === 2){
            
            this.button_order = obj.button_order;
            this.button_span = obj.button_span;
            this.button_textcolor = obj.button_textcolor;
            this.button_bgcolor = obj.button_bgcolor;
            this.button_callback = obj.button_callback;
            this.button_label = obj.button_label;
            this.button_url = obj.button_url;
            this.button_query = obj.button_query;
            this.next_menu = obj.next_menu;
            this.chat = obj.chat;
            this.button_icon = obj.button_icon;
            this.button_icon_bgcolor = obj.button_icon_bgcolor;
        }
        return;
    }

    toJsonObject = () => {
        let obj = {};

        if(this.button_order) obj.button_order = this.button_order;
        if(this.button_span) obj.button_span = this.button_span;
        if(this.button_textcolor) obj.button_textcolor = this.button_textcolor;
        if(this.button_bgcolor) obj.button_bgcolor = this.button_bgcolor;
        if(this.button_callback) obj.button_callback = this.button_callback;
        if(this.button_label) obj.button_label = this.button_label;
        if(this.button_url) obj.button_url = this.button_url;
        if(this.button_query) obj.button_query = this.button_query;
        if(this.next_menu) obj.next_menu = this.next_menu;
        if(this.chat) obj.chat = this.chat;
        if(this.button_icon) obj.button_icon = this.button_icon;
        if(this.button_bgcolor) obj.button_bgcolor = this.button_bgcolor;

        return obj;
    }
}