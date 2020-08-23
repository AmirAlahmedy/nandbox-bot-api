import OutMessage from '../outmessages/OutMessage';
/**
 * @author Hossam
 *
 */
export default class AddWhitelistPatternsOutMessage extends OutMessage {

	constructor() {
		this.method = 'addWhitelistPatterns';
    }
    
	toJsonObject() {
        let obj = super.toJsonObject();
        
		if (this.data) obj.data = this.data;

		return obj;
	}
}
