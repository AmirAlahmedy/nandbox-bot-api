import User from "../data/User";
import Chat from "../data/Chat";

export default class InlineMessageCallback {

    message_id;
    menu_ref;
    date;
    reference;
    from;
    chat;
    button_callback;
    button_query_result;

    constructor(jsonObj) {
        let obj = jsonObj.inlineMessageCallback;

        let fromUser = new User(obj.from);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);
        let btnqueryResults = obj.button_query_result == null ? null
            : new ButtonQueryResult(obj.button_query_result);
        this.message_id = obj.message_id;
        this.menu_ref = obj.menu_ref;
        this.reference = obj.reference;
        this.from = fromUser;
        this.button_query_result = btnqueryResults;
        this.button_callback = obj.button_callback;
        this.date = obj.date;
    }

    toJsonObject = () => {
        let obj;

        if (date) obj.date = date;
        if (from) obj.from = from.toJsonObject();
        if (chat) obj.chat = chat.toJsonObject();
        if (message_id) obj.message_id = message_id;
        if (menu_ref) obj.menu_ref = menu_ref;
        if (reference) obj.reference = reference;
        if (button_callback) obj.button_callback =  button_callback;
        if (button_query_result) obj.button_query_result = button_query_result;

        return obj;

    }
}