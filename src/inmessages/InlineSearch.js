const User = require("../data/User");
const Chat = require("../data/Chat");

module.exports = class InlineSearch {

    constructor(jsonObj) {
        console.log("json " + jsonObj);
        let obj = jsonObj.inlineSearch;

        let fromUser = new User(obj.from);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);
        this.method = obj.method;
        this.from = fromUser;
        this.date = obj.date;
        this.search_id = obj.search_id;
        this.offset = obj.offset;
        this.keywords = obj.keywords;		
    }

    toJsonObject(){
        let obj;

        if (this.date) obj.date =  date;

        if (this.from) obj.from =  from.toJsonObject();
        if (this.chat) obj.chat =  chat.toJsonObject();
        if (this.method) obj.method =  method;
        if (this.search_id) obj.search_id =  search_id;
        if (this.offset) obj.offset =  offset;
        if (this.keywords) obj.keywords =  keywords;

        console.log("to " + obj)
        return obj;
    }

}