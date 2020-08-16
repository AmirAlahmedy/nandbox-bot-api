/**
 * @author Hossam
 *
 */
export default class GetBlackListOutMessage extends OutMessage {

	constructor() {
		this.method = 'getBlacklist';
	}

	toJsonObject() {
		let obj = super.toJsonObject();
        
        if (this.page_size) obj.page_size = this.page_size;
		
		return obj;
	}
}
