export default class ChatAdministrators {
    
    administrators = [];
    chat;

    constructor(jsonObj) {
        let obj = jsonObj.chatAdministrators;
        this.chat = obj.chat == null ? null : new Chat( obj.chat);

        let adminArrayObj = obj.administrators;
        if (adminArrayObj != null) {

            let admin = [];
            for (let i = 0; i < adminArrayObj.size(); i++)
                admin[i] = new User(adminArrayObj[i]);

            this.administrators = admin;
        }
    }

    toJsonObject = () => {
        let obj;
        if (administrators) {
            let adminsArrayObjnew = [];
            for (let i = 0; i < administrators.length; i++)
                adminsArrayObjnew.push(administrators[i].toJsonObject());
            obj.administrators = adminsArrayObjnew;
        }

        if (chat) {
            obj.chat =  chat.toJsonObject();
        }

        return obj;
    }
}