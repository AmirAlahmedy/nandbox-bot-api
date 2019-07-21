"use strict";

export default class NandBox {
    constructor() {
        if (new.target !== NandBox)
            throw new Error('Subclassing from NandBox class is not allowed: It is a final class');
    }

    Callback = class Callback {
        /**
         * This event indicates that the bot is successfully connected and authenticated
         * with nandbox server.
         * @param api reference for the api interface to be used
         * to send any message to nandbox server
         *
         */
        onConnect = api => { };
        /**
         * This event should be used to handle incoming messages from server
         *
         * @param incomingMsg
         *            incoming message from server
         */
        onReceive = incomingMsg => { };
        /**
         * This event should be used to handle incoming messages from server
         *
         * @param obj
         *            incoming json object from server, this will be fired only if the
         *            bot received a message from server that is not handled in Bot API.
         *            .
         */
        onReceiveObj = obj => { };
        /**
         * After the web socket closed , this event will be called to allow clearing and
         * destroying any resources.
         */
        onClose = () => { };
        /**
         * When any issue happens related to web socket,this event will be called to
         * allow handling of this error.
         */
        onError = () => { };
        /**
		 * This event should be used to handle normal keypad button pressed
		 *
		 * @param chatMenuCallback
		 *            This object represents an incoming callback query from a callback
		 *
        onChatMenuCallBack = chatMenuCallback => { };
        /**
         * This event should be used to handle Inline menu keypad button pressed
         *
         * @param inlineMsgCallback
         *            This object represents an incoming callback query from a callback
         *            button within an inline keypad menu associated with a specific
         *            message.
         */
        onInlineMessageCallback = inlineMsgCallback => { };
        /**
         * @param msgAck Message ack object holding acknowledge message details
         */
        onMessagAckCallback = msgAck => { };
        /**
         * This event should be used to handle users joining bot.
         *
         * @param user
         *            object represents a user,returned when user joined bot
         */
        onUserJoinedBot = user => { };
        /**
		 * This event should be used to handle users joining/leaving chat (i.e. Channel
		 * or Group) . This event will fire as a reply to
		 * getChatMember,banChatMember,unbanChatMember,removeChatMember and when user
		 * join or leaves the chat.
		 * 
		 * @param chatMember
		 *            This object represents a chat member user
		 */
        onChatMember = chatMember => { };

		/**
		 * This event should be fired as a reply to calling
		 *  // TODO: add link here
		 * 
		 * @param chatAdministrators
		 *            This object represents chat administrator users for specific chat.
		 */
        onChatAdministrators = chatAdministrators => { };

		/**
		 * This event should be used to handle user restarting bot action
		 * 
		 * @param user object holding information about 
		 */
        userStartedBot = user => { };

		/**
		 * @param user the bot profile
		 */
        onMyProfile = user => { };
		/**
		 * @param user user object contain user details 
		 */
        onUserDetails = user => { };

		/**
		 * @param user details of the usee who stopped the bot
		 */
        userStoppedBot = user => { };

		/**
		 * @param user details of the use who left the bot
		 */
        userLeftBot = user => { };

		/**
		 * Call back for generating URL 
		 * @param permenantUrl the generated permanent URL details
		 */
        permanentUrl = permenantUrl => { };

		/**
		 * @param chat chat object contain details of specific chat
		 */
        onChatDetails = chat => { };

		/**
		 * @param inlineSearch inline search object that contain inline search info
		 */
        onInlineSearh = inlineSearch => { };

    }
}

Api = class Api {
    send = message => { };
    // TODO: change name if possible -> sendText: (chatId, text) => {},
    sendTextWithBackground = (chatId, text, bgColor) => { };
    //TODO: change name if possible -> sendText: (chatId, text, reference) => {},
    sendText = (chatId, text, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings, bgColor) => { };
    // TODO: change name if possible -> sendPhoto: (chatId, photoFileID, caption) => {},
    // TODO: change name if possible -> sendPhoto: (chatId, photoFileID, reference, caption) => {},
    sendPhoto = (chatId, photoFileID, caption, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings) => { };


}




