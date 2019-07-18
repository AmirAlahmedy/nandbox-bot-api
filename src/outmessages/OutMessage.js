"use strict";
import Menu from "../data/Menu";

export default class OutMessage {

    // enum
    OutMessageMethod = Object.freeze({ sendMessage: 0, sendPhoto: 1, sendVideo: 2, sendAudio: 3, sendVoice: 4, sendLocation: 5, sendGif: 6, sendDocument: 7, sendContact: 8, editMessage: 9, updateMessage: 10, setChatMenu: 11, setNavigationButton: 12, inlineSearchAnswer: 13, setMyProfile: 14, getUser: 15, getChat: 16, getChatAdministrators: 17, getChatMember: 18, banChatMember: 19, unbanChatMember: 20, removeChatMember: 21, setChat: 22, recallMessage: 23, getMyProfiles: 24, generatePermanentUrl: 25 });

    static WEB_PREVIEW_DISABLE = 1;
    static WEB_PREVIEW_HIDE_LINK = 2;
    static WEB_PREVIEW_INSTANCE_VIEW = 3;
    static WEB_PREVIEW_INSTANCE_WITHOUT_LINK = 4;

    //static KEY_STYLE = "style";


    // TODO: check syntax
    method;
    chatId;
    reference;
    toUserId;
    replyToMessageId;
    webPagePreview;
    disableNotification;
    caption;
    echo;
    menuRef;
    inlineMenus = [];
    chatSettings;

    toJsonObject = () => {
        let obj = {};

        if (this.method) obj.method = this.method;
        if (this.chatId) obj.chat_id = this.chatId;
        if (this.reference) obj.reference = this.reference;
        if (this.toUserId) obj.to_user_id = this.toUserId;
        if (this.replyToMessageId) obj.reply_to_message_id = this.replyToMessageId;
        if (this.webPagePreview) obj.web_page_preview = this.webPagePreview;
        if (this.disableNotification) obj.disable_notification = this.disableNotification;
        if (this.caption) obj.caption = this.caption;
        if (this.echo) obj.echo = this.echo;
        if (this.menuRef) obj.menu_ref = this.menuRef;
        if (this.inlineMenus) {
            let inlineMenusArrayObj = [];
            for (let i = 0; i < inlineMenus.length; i++) {
                this.inlineMenus[i] = new Menu();
                inlineMenusArrayObj[i] = inlineMenus[i].toJsonObject();
            }

            obj.inline_menu = this.inlineMenus;
        }
        if (this.chatSettings) obj.chat_settings = this.chatSettings;
    }
}