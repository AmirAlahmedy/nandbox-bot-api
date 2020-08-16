const OutMessage = require('../outmessages/OutMessage');
/**
 * This class represents Output Message used to send Voice file .
 * 
 * @author Hossam Mohamed
 *
 */

export default class ArticleOutMessage extends OutMessage {


	constructor() {
		this.method = "sendArticle";
	}

    toJsonObject() {
		let obj = {};

		if (this.url) obj.url = this.url;
		if (this.title) obj.title = this.title;
		if (this.description) obj.description = this.description;
		if (this.photo) obj.photo = this.photo;
		if (this.photoUrl) obj.photoUrl = this.photoUrl;
        
        return obj;
	}

}
