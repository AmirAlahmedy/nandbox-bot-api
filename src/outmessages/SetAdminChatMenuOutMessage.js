/**
 * 
 * This class represents Output Message used to send Chat Menu
 * 
 * @author Hossam Mohamed
 *
 */
export default class SetAdminChatMenuOutMessage extends OutMessage {

	constructor() {
		this.method = OutMessageMethod.setAdminChatMenu;
	}

	toJsonObject() {
		let obj = super.toJsonObject();
		if (this.menus) {
			let menusArrayObj = [];
			for (let i = 0; i < menus.length(); i++) {
				menusArrayObj.push(menus[i].toJsonObject());
			}

			obj.menus = menusArrayObj;
		}
		return obj;
	}
}
