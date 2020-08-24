const { default: SignupUser } = require("./SignupUser");

module.exports =  class WhiteListUser  {

	constructor(obj) {
		this.signupUser = obj.signup_user;
		this.tags = tags;

	}

	toJsonObject() {
		let obj = {};

		if (this.signup_user) obj.signup_user = this.signup_user;
		if (this.tags) obj.tags = this.tags;
		
		return obj;
	}
}
