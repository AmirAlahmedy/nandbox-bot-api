/**
 * @author Hossam
 *
 */
export default class DeleteBlackListOutMessage extends OutMessage {

	constructor() {
		this.method = 'deleteBlacklist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.users = this.users;
		
		return obj;
	}
}
