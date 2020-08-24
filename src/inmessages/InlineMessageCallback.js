const User = require("../data/User");
const Chat = require("../data/Chat");

module.exports = class InlineMessageCallback {


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

    toJsonObject(){
        let obj;

        if (this.date) obj.date = this.date;
        if (this.from) obj.from = this.from.toJsonObject();
        if (this.chat) obj.chat = this.chat.toJsonObject();
        if (this.message_id) obj.message_id = this.message_id;
        if (this.menu_ref) obj.menu_ref = this.menu_ref;
        if (this.reference) obj.reference = this.reference;
        if (this.button_callback) obj.button_callback =  this.button_callback;
        if (this.button_query_result) obj.button_query_result = this.button_query_result;

        return obj;

    }
}