"strict mode";

class NandBox {
    constructor() {
        if (new.target !== NandBox)
            throw new Error('Subclassing from NandBox class is not allowed: It is a final class');
    }

    Callback = class {
        onConnect = api => { };
        onReceive = incomingMsg => { };
        onReceiveObj = obj => { };
        onClose = () => { };
        onError = () => { };
    }

    Api = class {
        send = message => { };
        // TODO: change name if possible -> sendText: (chatId, text) => {},
        sendTextWithBackground = (chatId, text, bgColor) => { };
        //TODO: change name if possible -> sendText: (chatId, text, reference) => {},
        sendText = (chatId, text, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings, bgColor, options) => { };
        // TODO: change name if possible -> sendPhoto: (chatId, photoFileID, caption) => {},
        // TODO: change name if possible -> sendPhoto: (chatId, photoFileID, reference, caption) => {},
        sendPhoto = (chatId, photoFileID, caption, reference, replyToMessageId, toUserId, webPagePreview, disableNotification, chatSettings, options) => { };


    }
}
export {
    NandBox,
    Callback,
    Api
}
