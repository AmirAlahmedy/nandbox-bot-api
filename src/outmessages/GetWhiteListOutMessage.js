import OutMessage from '../outmessages/OutMessage';

/**
 * @author Hossam
 *
 */
export default class GetWhiteListOutMessage extends OutMessage {

	constructor() {
		this.method = 'getWhitelist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.pageSize) obj.page_size = this.page_size;
		
		return obj;
	}

}
