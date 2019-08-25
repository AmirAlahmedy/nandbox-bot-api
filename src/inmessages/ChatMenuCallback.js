import ButtonQueryResult from "../data/ButtonQueryResult";
import User from "../data/User";
import Chat from "../data/Chat";

export default class ChatMenuCallback {

    date;
    next_menu;
    method;
    from;
    chat;
    button_callback;
    menu_ref;
    button_query_result;

    constructor(jsonObj) {
       console.log("json " + JSON.stringify(jsonObj));
        let obj = jsonObj.chatMenuCallback;

        let fromUser = new User(obj.from);
        this.chat = obj.chat == null ? null : new Chat( obj.chat);
        let btnqueryResults = obj.button_query_result == null ? null
            : new ButtonQueryResult( obj.button_query_result);
        this.method = obj.method;
        this.menu_ref = obj.menu_ref;
        this.from = fromUser;
        this.button_query_result = btnqueryResults;
        this.button_callback = obj.button_callback;
        this.next_menu = obj.next_menu;
        this.date = obj.date;
    }

     toJsonObject = () => {

        let obj;

        if (date) obj.date = date;
        if (from) obj.from = from.toJsonObject();
        if (chat) obj.chat = chat.toJsonObject();
        if (method) obj.method = method;
        if (menuRef) obj.menu_ref = menu_ref;
         if (buttonCallback) obj.button_callback = button_callback;
         if (buttonQueryResult) obj.button_query_result = button_query_result;
        if (nextMenu) obj.next_menu = next_menu;

        console.log("to " + JSON.stringify(obj));
        return obj;

    }
}