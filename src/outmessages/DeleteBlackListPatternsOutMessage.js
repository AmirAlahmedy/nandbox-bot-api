import OutMessage from '../outmessages/OutMessage';

export default class DeleteBlackListPatternsOutMessage extends OutMessage {

	constructor() {
		this.method = 'deleteBlacklistPatterns';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.pattern) obj.pattern = this.pattern;
		
		return obj;
	}
}
