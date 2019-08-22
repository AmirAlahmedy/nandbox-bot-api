import User from "../data/User";
import Chat from "../data/Chat";

export default class InlineSearch {

    date;
    method;
    from;
    chat;
    searchId;
    offset;
    keywords;

    constructor(jsonObj) {
        console.log("json " + jsonObj);
        let obj = jsonObj.inlineSearch;

        let fromUser = new User(obj.from);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);
        this.method = obj.method;
        this.from = fromUser;
        this.date = obj.date;
        this.searchId = obj.search_id;
        this.offset = obj.offset;
        this.keywords = obj.keywords;		
    }

    toJsonObject = () => {
        let obj;

        if (date) obj.date =  date;

        if (from) obj.from =  from.toJsonObject();
        if (chat) obj.chat =  chat.toJsonObject();
        if (method) obj.method =  method;
        if (searchId) obj.search_id =  searchId;
        if (offset) obj.offset =  offset;
        if (keywords) obj.keywords =  keywords;

        console.log("to " + obj)
        return obj;
    }

}