package com.nandbox.bots.api.outmessages;

import net.minidev.json.JSONObject;

/**
 * This class represents Output Message used to send Voice file .
 * 
 * @author Hossam Mohamed
 *
 */

public class ArticleOutMessage extends OutMessage {


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
