const Chat = require('../data/Chat');
const SignupUser = require('../data/SignupUser');

export default class BlackList {


	constructor(obj) {

        let obj = this.blacklist;
        
		this.eop = obj.eop;

		this.chat = obj.chat == null ? null : new Chat(obj.chat);
		let usersArrayObj = obj.users;
		this.users = new SignupUser[usersArrayObj.length()];
		for (let i = 0; i < usersArrayObj.size(); i++) {
			users[i] = new SignupUser(usersArrayObj[i]);
		}

	}

	toJsonObject() {

		let obj = {};

		if (this.users) {
			let usersArrayObjnew = [];
			for (let i = 0; i < users.length; i++) {
				usersArrayObjnew.push(users[i].toJsonObject());
			}
			obj.users = usersArrayObjnew;
		}
		if (this.chat) obj.chat = this.chat.toJsonObject();
		if (this.eop) obj.eop = this.eop;
		

		return obj;

	}
}
