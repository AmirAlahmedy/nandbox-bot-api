

/**
 * This class represents incoming Message used to get Article Message .
 * 
 * @author Hossam Mohamed
 *
 */
module.exports = class Article {


	constructor(obj) {

		this.id = obj.id;
		this.width = obj.width;
		this.height = obj.height;
		this.size = obj.size;
		this.thumbnail = obj.thumbnail != null ? new Thumbnail(obj.thumbnail) : null;

	}

	toJsonObject() {
		let obj = {};

		if (this.id) obj.put(KEY_ID, id);
		if (this.width) obj.put(KEY_WIDTH, width);
		if (this.height) obj.put(KEY_HEIGHT, height);
		if (this.size) obj.put(KEY_SIZE, size);
		if (this.thumbnail) obj.put(KEY_THUMBNAIL, thumbnail);

		return obj;

	}
}