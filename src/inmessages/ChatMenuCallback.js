import ButtonQueryResult from "../data/ButtonQueryResult";

export default class ChatMenuCallback {

    date;
    nextMenu;
    method;
    from;
    chat;
    buttonCallback;
    menuRef;
    buttonQueryResult;

    constructor(jsonObj) {
       console.log("json " + jsonObj.toJSONString());
        let obj = jsonObj.chatMenuCallback;

        let fromUser = new User(obj.from);
        this.chat = obj.chat == null ? null : new Chat( obj.chat);
        let btnqueryResults = obj.button_query_result == null ? null
            : new ButtonQueryResult( obj.button_query_result);
        this.method = obj.method;
        this.menuRef = obj.menu_ref;
        this.from = fromUser;
        this.buttonQueryResult = btnqueryResults;
        this.buttonCallback = obj.button_callback;
        this.nextMenu = obj.next_menu;
        this.date = obj.date;
    }

     toJsonObject = () => {

        let obj;

        if (date) obj.date = date;
        if (from) obj.from = from.toJsonObject();
        if (chat) obj.chat = chat.toJsonObject();
        if (method) obj.method = method;
        if (menuRef) obj.menu_ref = menuRef;
        if (buttonCallback) obj.button_callback = buttonCallback;
        if (buttonQueryResult) obj.button_query_result = buttonQueryResult;
        if (nextMenu) obj.next_menu = nextMenu;

        console.log("to " + JSON.stringify(obj));
        return obj;

    }
}