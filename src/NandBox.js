"use strict";
module.exports =  class NandBox {
    constructor() {
        if (new.target !== NandBox)
            throw new Error('Subclassing from NandBox class is not allowed: It is a final class');
    }

    /**
     * Handling all events expected from server , these events includes actions to
     * do when the bot connected to nandbox server
     * {@link Nandbox.Callback#onConnect onConnect} and also
     * handling errors and closing of the connection with nandbox server. Callback
     * is used also to handle all incoming messages from nandbox server like
     * {@link Nandbox.Callback#onReceive onReceive} which
     * indicates that the bot received a message
     *
     * @author Ahmed A. El-Malatawy @author Amir
     *
     */
    Callback() {
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
		 */
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
    /**
     * @author Ahmed A. El-Malatawy @author Amir
     *
     */
    Api() {
        /**
         * @param message
         *            message object
         */
        send = message => { };
        /**
         * @param chatId  Unique identifier for the target chat or User id and can not set
         *            to null
         * @param text text message to send
         * @param bgColor text message background color Hex code in format : #HHHHHH
         * @return reference the sent message reference
         */
        sendTextWithBackground = (chatId, text, bgColor) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id
         * @param text
         *            text message to be send
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         * @param bgColor
         *            backText message Background color in hexadecimal format (Hex
         *            triplet ) or according to its common English name . Example : Red
         *            color can be set as #FF0000
         *
         */
        sendText = (chatId, text, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings, bgColor) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param photoFileId
         *            Id of photo and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with Photo
         *            "Photo caption 0-256 characters "
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only .
         */
        sendPhoto = (chatId, photoFileID, caption, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param videoFileId
         *            Id of video and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with video
         *            "video caption 0-256 characters "
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendVideo = (chatId, videoFileId, reference, replyToMessageId,
            toUserId, webPagePreview, disableNotification, caption,
            chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param audioFileId
         *            Id of audio and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with audio
         *            "audio caption 0-256 characters "
         *
         * @param performer
         *            name of audio perfromer
         * @param title
         *            title of the audio
         * @param chatSettings
         *            title of the audio
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendAudio = (chatId, audioFileId, reference, replyToMessageId,
            toUserId, webPagePreview, disableNotification, caption, performer,
            title, chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param phoneNumber
         *            Contact phone number
         * @param name
         *            Contact full name
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         *
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendContact = (chatId, phoneNumber, name, reference, replyToMessageId,
            toUserId, webPagePreview, disableNotification, chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param voiceFileId
         *            Id of voice and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with voice
         *            "voice caption 0-256 characters "
         *
         * @param size
         *            size of the voice
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendVoice = (chatId, voiceFileId, reference, replyToMessageId,
            toUserId, webPagePreview, disableNotification, caption, size,
            chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param documentFileId
         *            Id of document and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with document
         *            "document caption 0-256 characters "
         * @param name
         *            name of document
         * @param size
         *            size of document
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendDocument = (chatId, documentFileId, reference, replyToMessageId,
            toUserId, webPagePreview, disableNotification, caption, name,
            size, chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param latitude
         *            Latitude of the location
         * @param longitude
         *            longitude of the location
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param name
         *            Period in seconds for which the location will be updated (see Live
         *            Locations, should be between 60 and 86400.
         * @param details
         *            details of the location
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendlocation = (chatId, latitude, longitude, reference,
            replyToMessageId, toUserId, webPagePreview, disableNotification,
            name, details, chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param gifFileId
         *            Id of gif and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with gif "gif
         *            caption 0-256 characters "
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendGIF = (chatId, gifFileId, reference, replyToMessageId, toUserId,
            webPagePreview, disableNotification, caption, chatSettings) => { };
        /**
         * @param chatId
         *            Unique identifier for the target chat or User_id and can not set
         *            to null
         * @param gifFileId
         *            Id of gif and can not set to null
         * @param reference
         *            Unique local identifier for the target chat/user , can not set to
         *            <code>null</code>
         * @param replyToMessageId
         *            If the message is a reply, ID of the original message
         * @param toUserId
         *            If reply or send message to target user within a group chat or
         *            channel, unique identifier of the target user.
         * @param webPagePreview
         *            Disables link previews for links in this message
         * @param disableNotification
         *            Sends the message silently. Users will receive a notification with
         *            no sound.
         * @param caption
         *            Caption (optionally <code>null</code>) to be send with gif "gif
         *            caption 0-256 characters "
         * @param chatSettings
         *            <B>1</B> to send to Chat(i.e. group/Channel)super admins only
         */
        sendGIFVideo = (chatId, gifFileId, reference, replyToMessageId,
            toUserId, webPagePreview, disableNotification, caption,
            chatSettings) => { };
        /**
		 * Use this message to update existing Message sent
		 * 
		 * @param messageId
		 *            Unique identifier for the message and can not set to null
		 * @param text
		 *            The new message text
		 * @param caption
		 *            The new caption text
		 * @param toUserId
		 *            Id of Target user to receive updated message
		 * @param chatId
		 *            Id of Target Group or Channel id
		 */
        updateMessage = (messageId, text, caption, toUserId, chatId) => { };

        /**
         * @param messageId
         *            Unique identifier for the message and can not set to null
         * @param text
         *            The new message text
         * @param toUserId
         *            Id of Target user to receive updated message
         * 
         * 
         */
        updateTextMsg = (messageId, text, toUserId) => { };
        /**
		 * @param messageId
		 *            Unique identifier for the message and can not set to null
		 * @param caption
		 *            The new caption text
		 * @param toUserId
		 *            Id of Target user to receive updated message
		 */
        updateMediaCaption = (messageId, caption, toUserId) => { };

        /**
         * @param messageId
         *            Unique identifier for the message and can not set to null
         * @param text
         *            The new message text
         * @param chatId
         *            Id of Target Group or Channel id
         */
        updateChatMsg = (messageId, text, chatId) => { };
        /**
		 * @param messageId
		 *            Unique identifier for the message and can not set to null
		 * @param caption
		 *            The new caption text
		 * @param chatId
		 *            Id of Target Group or Channel id
		 */
        updateChatMediaCaption = (messageId, caption, chatId) => { };

        /**
         * Use this method to get profile for a user
         * 
         * @param userId
         *            Id of Target user to receive updated message
         */
        getUser = (userId) => { };

        /**
         * Use this method to get Group or Channel information.
         * 
         * @param chatId
         *            Id of Target Group or Channel id
         */
        getChat = (chatId) => { };
        /**
		 * Use this method to get Chat Member user public profile.
		 * 
		 * @param chatId
		 *            Id of Target Group or Channel id
		 * @param userId
		 *            Id of Target user to receive updated message
		 */

        getChatMember = (chatId, userId) => { };

        /**
         * Use this method to get Chat Administrators
         * 
         * @param chatId
         *            Id of Target Group or Channel id
         */
        getChatAdministrators = (chatId) => { };

        /**
         * Use this method to ban a Chat Member from accessing Chat
         * 
         * @param chatId
         *            Id of Target Group or Channel id
         * @param userId
         *            Id of Target user to receive updated message
         */

        banChatMember = (chatId, userId) => { };
        /**
		 * Use this method to unban a Chat Member from accessing Chat.
		 * 
		 * @param chatId
		 *            Id of Target Group or Channel id
		 * @param userId
		 *            Id of Target user to receive updated message
		 */

        unbanChatMember = (chatId, userId) => { };

        /**
         * Use this method to remove a Chat Member from Chat.
         * 
         * @param chatId
         *            Id of Target Group or Channel id
         * @param userId
         *            Id of Target user to receive updated message
         */

        removeChatMember = (chatId, userId) => { };
        /**
		 * Use this message to recall existing Message sent .
		 * 
		 * @param chatId
		 *            Id of Target
		 * @param messageId
		 *            Unique identifier for the message
		 * @param toUserId
		 *            If reply or send message to target user within a group chat or
		 *            channel, unique identifier of the target user.
		 * @param reference
		 *            Unique local identifier for the target chat/user
		 */
        recallMessage = (chatId, messageId, toUserId, reference) => { };

        /**
         * Use this method to set Bot Profile
         * 
         * @param user
         *            User object with unique user Id used to update User information
         */
        setMyProifle = user => { };
        /**
		 * Use this method to set Chat Group or Channel information
		 * 
		 * @param chat
		 *            Chat object with unique chat Id used to update chat information
		 */
        setChat = chat => { };

        /**
         * Use this method to get Bot Profile
         */
        getMyProfiles = () => { };


        /**
         * Use this method to generate permanent URL for the file
         * @param file  unique file Id for the file  
         * @param param1 Generic parameter to set any local reference for the permanent  file
         */
        generatePermanentUrl = (file, param1) => { };
    }
}





