module.exports = class ChatMember {

    constructor(jsonObj) {
        let obj = jsonObj.chatMember;
        this.user = obj.user == null ? null : new User(obj.user);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);

        this.type = obj.type;
        this.member_since = obj.member_since;
        this.status = obj.status;
    }
    
    toJsonObject(){
        let obj;

        if (this.user) obj.user = user.toJsonObject();
        if (this.chat) obj.chat = chat.toJsonObject();
        if (this.type) obj.type = type;
        if (this.member_since) obj.member_since = member_since;
        if (this.status) obj.status = status;

        return obj;
    }

}