module.exports = class TextFile {
  
    constructor(obj) {
        this.size = obj.size;
        this.id = obj.id;
    }

    toJsonObject(){
        let obj = {};

        if (this.size) obj.size = this.size;
        if (this.id) obj.id = this.id;

        return obj;
    }
}