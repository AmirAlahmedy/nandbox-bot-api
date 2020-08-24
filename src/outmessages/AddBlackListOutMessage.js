const OutMessage = require('./OutMessage');
/**
 * @author Hossam
 * @author Amir
 */module.exports =  class AddBlackListOutMessage extends OutMessage {

	constructor() {
		this.method = 'addBlacklist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.users) obj.users = this.users;

		return obj;
	}
}
