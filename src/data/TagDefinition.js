
module.exports = class TagDefination {

	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
		this.isPrivate = Utils.getInteger(obj.isPrivate);

	}

	toJsonObject() {
		let obj = {};

		if (this.id) obj.id = this.id;
		if (this.name) obj.name = this.name;
		if (this.description) obj.description = this.description;
		if (this.isPrivate) obj.isPrivate = this.isPrivate;

		return obj;

	}

}
