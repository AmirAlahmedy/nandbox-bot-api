"use strict";
import Menu from "../data/Menu";

export default class OutMessage {

    static WEB_PREVIEW_DISABLE = 1;
    static WEB_PREVIEW_HIDE_LINK = 2;
    static WEB_PREVIEW_INSTANCE_VIEW = 3;
    static WEB_PREVIEW_INSTANCE_WITHOUT_LINK = 4;
    

    method;
    chat_id;
    reference;
    to_user_id;
    reply_to_message_id;
    web_page_preview;
    disable_notification;
    caption;
    echo;
    menu_ref;
    inline_menu;
    chat_settings;

    toJsonObject = () => {
        let obj = {};

        if (this.method) obj.method = this.method;
        if (this.chat_id) obj.chat_id = this.chat_id;
        if (this.reference) obj.reference = this.reference;
        if (this.to_user_id) obj.to_user_id = this.to_user_id;
        if (this.reply_to_message_id) obj.reply_to_message_id = this.reply_to_message_id;
        if (this.web_page_preview) obj.web_page_preview = this.web_page_preview;
        if (this.disable_notification) obj.disable_notification = this.disable_notification;
        if (this.caption) obj.caption = this.caption;
        if (this.echo) obj.echo = this.echo;
        if (this.menu_ref) obj.menu_ref = this.menu_ref;
        if (this.inline_menu) {
            let inlineMenusArrayObj = [];
            for (let i = 0; i < inline_menu.length; i++) {
                this.inline_menu[i] = new Menu();
                inlineMenusArrayObj[i] = inline_menu[i].toJsonObject();
            }
            obj.inline_menu = this.inline_menu;
        }
        if (this.chat_settings) obj.chat_settings = this.chat_settings;

        return obj;
    }
}