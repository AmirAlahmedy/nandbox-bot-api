/**
 * @author Hossam
 *
 */
export default class AddWhiteListOutMessage extends OutMessage {

	// private WhiteListUser whiteListUser;
	constructor() {
		this.method = 'addWhitelist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
		let menusArrayObj = [];
		for (let i = 0; i < this.users.length(); i++) {
			menusArrayObj.push(this.users[i].toJsonObject());
		}

		obj.users = menusArrayObj;

		return obj;
	}

}
