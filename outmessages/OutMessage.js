"use strict";
import Menu from "./Menu";

export default class OutMessage {

    // enum
    OutMessageMethod = Object.freeze({ sendMessage: 0, sendPhoto: 1, sendVideo: 2, sendAudio: 3, sendVoice: 4, sendLocation: 5, sendGif: 6, sendDocument: 7, sendContact: 8, editMessage: 9, updateMessage: 10, setChatMenu: 11, setNavigationButton: 12, inlineSearchAnswer: 13, setMyProfile: 14, getUser: 15, getChat: 16, getChatAdministrators: 17, getChatMember: 18, banChatMember: 19, unbanChatMember: 20, removeChatMember: 21, setChat: 22, recallMessage: 23, getMyProfiles: 24, generatePermanentUrl: 25 });

    static WEB_PREVIEW_DISABLE = 1;
    static WEB_PREVIEW_HIDE_LINK = 2;
    static WEB_PREVIEW_INSTANCE_VIEW = 3;
    static WEB_PREVIEW_INSTANCE_WITHOUT_LINK = 4;

    static KEY_METHOD = "method";
    static KEY_CHAT_ID = "chat_id";
    static KEY_REFERENCE = "reference";
    static KEY_TO_USER_ID = "to_user_id";
    static KEY_REPLAY_TO_MESSAGE_ID = "reply_to_message_id";
    static KEY_WEB_PAGE_PREVIEW = "web_page_preview";
    static KEY_DISABLE_NOTIFICATION = "disable_notification";
    static KEY_CAPTION = "caption";
    static KEY_ECHO = "echo";
    static KEY_MENU_REF = "menu_ref";
    static KEY_INLINE_MENU = "inline_menu";
    static KEY_CHAT_SETTINGS = "chat_settings";
    static KEY_STYLE = "style";


    // TODO: check syntax
    method = new this.OutMessageMethod();
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

        if (this.method) obj.KEY_METHOD = this.method;
        if (this.chatId) obj.KEY_CHAT_ID = this.chatId;
        if (this.reference) obj.KEY_REFERENCE = this.reference;
        if (this.toUserId) obj.KEY_TO_USER_ID = this.toUserId;
        if (this.replyToMessageId) obj.KEY_REPLAY_TO_MESSAGE_ID = this.replyToMessageId;
        if (this.webPagePreview) obj.KEY_WEB_PAGE_PREVIEW = this.webPagePreview;
        if (this.disableNotification) obj.KEY_DISABLE_NOTIFICATION = this.disableNotification;
        if (this.caption) obj.KEY_CAPTION = this.caption;
        if (this.echo) obj.KEY_ECHO = this.echo;
        if (this.menuRef) obj.KEY_MENU_REF = this.menuRef;
        if (this.inlineMenus) {
            let inlineMenusArrayObj = [];
            for (let i = 0; i < inlineMenus.length; i++) {
                this.inlineMenus[i] = new Menu();
                inlineMenusArrayObj[i] = inlineMenus[i].toJsonObject();
            }

            obj.KEY_INLINE_MENU = this.inlineMenus;
        }
        if (this.chatSettings) obj.KEY_CHAT_SETTINGS = this.chatSettings;
    }
}