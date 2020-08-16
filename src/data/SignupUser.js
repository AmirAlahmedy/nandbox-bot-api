
export default  class SignupUser {

	constructor(obj) {
		this.id = obj.id;
		this.signup_user = obj.signup_user;

	}

	toJsonObject() {
		let obj = {};

		if (this.id) obj.id = this.id;
		if (this.signup_user) obj.signup_user = this.signup_user;

		return obj;

	}

}
