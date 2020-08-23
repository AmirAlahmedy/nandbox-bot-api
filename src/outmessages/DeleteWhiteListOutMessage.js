import OutMessage from '../outmessages/OutMessage';

/**
 * @author Hossam
 *
 */
export default class DeleteWhiteListOutMessage extends OutMessage {

	constructor() {
		this.method = 'deleteWhitelist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.users = this.users;
		
		return obj;
	}
}
