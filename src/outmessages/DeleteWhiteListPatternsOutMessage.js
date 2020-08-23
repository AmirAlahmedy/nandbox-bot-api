import OutMessage from '../outmessages/OutMessage';

export default class DeleteWhiteListPatternsOutMessage extends OutMessage {

	constructor() {
		this.method = 'deleteWhitelistPatterns';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.pattern) obj.pattern = this.pattern;
		
		return obj;
	}
}
