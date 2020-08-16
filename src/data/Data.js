export default  class Data {


	constructor(obj) {
		this.pattern = obj.pattern;
		this.example = obj.example;

	}

	toJsonObject() {
		let obj = {};

		if (this.pattern) obj.pattern = this.pattern;
		if (this.example) obj.example = this.example;

		return obj;

	}
}
