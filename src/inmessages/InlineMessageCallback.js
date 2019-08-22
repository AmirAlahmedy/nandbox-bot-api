import User from "../data/User";
import Chat from "../data/Chat";

export default class InlineMessageCallback {

    messageId;
    menuRef;
    date;
    reference;
    from;
    chat;
    buttonCallback;
    buttonQueryResult;

    constructor(jsonObj) {
        let obj = jsonObj.inlineMessageCallback;

        let fromUser = new User(obj.from);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);
        let btnqueryResults = obj.button_query_result == null ? null
            : new ButtonQueryResult(obj.button_query_result);
        this.messageId = obj.message_id;
        this.menuRef = obj.menu_ref;
        this.reference = obj.reference;
        this.from = fromUser;
        this.buttonQueryResult = btnqueryResults;
        this.buttonCallback = obj.button_callback;
        this.date = obj.date;
    }

    toJsonObject = () => {
        let obj;

        if (date) obj.date = date;
        if (from) obj.from = from.toJsonObject();
        if (chat) obj.chat = chat.toJsonObject();
        if (messageId) obj.message_id = messageId;
        if (menuRef) obj.menu_ref = menuRef;
        if (reference) obj.reference = reference;
        if (buttonCallback) obj.button_callback =  buttonCallback;
        if (buttonQueryResult) obj.button_query_result = buttonQueryResult;

        return obj;

    }
}