export default class ChatMember {

 user;
 chat;
 type;
 memberSince;
 status;
 
    constructor(jsonObj) {
        let obj = jsonObj.chatMember;
        this.user = obj.user == null ? null : new User(obj.user);
        this.chat = obj.chat == null ? null : new Chat(obj.chat);

        this.type = obj.type;
        this.memberSince = obj.member_since;
        this.status = obj.status;
    }
    
    toJsonObject = () => {
        let obj;

        if (user) obj.user = user.toJsonObject();
        if (chat) obj.chat = chat.toJsonObject();
        if (type) obj.type = type;
        if (memberSince) obj.member_since = memberSince;
        if (status) obj.status = status;

        return obj;
    }

}