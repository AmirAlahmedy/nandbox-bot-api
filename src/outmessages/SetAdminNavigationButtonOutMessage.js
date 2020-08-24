const OutMessage = require('../outmessages/OutMessage');
/**
 * 
 * This class represents Output Message used to send Navigation Button
 * 
 * @author Hossam Mohamed
 *
 */
module.exports = class SetAdminNavigationButtonOutMessage extends OutMessage {

	constructor() {
		this.method = 'setAdminNavigationButton';
	}
	
	toJsonObject() {
		let obj = super.toJsonObject();
		if (this.navigation_button)  obj.navigation_button = this.navigation_button.toJsonObject();
		
		return obj;
	}
}
