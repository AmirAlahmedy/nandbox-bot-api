module.exports = class Result {

    constructor(obj) {
        if (!obj) return;

        this.id = obj.id;
        this.caption = obj.caption;
        this.title = obj.title;
        this.description = obj.description;
        this.url = obj.url;
        this.type = obj.type;
        this.thumb_url = obj.thumb_url;
        
        this.width = obj.width;
        this.height = obj.height;		
    }

    toJsonObject(){
        let obj;

        if (this.id) obj.id =  this.id;
        if (this.caption) obj.caption =  this.caption;
        if (this.title) obj.title =  this.title;
        if (this.description) obj.description =  this.description;
        if (this.url) obj.url =  this.url;
        if (this.type) obj.type =  this.type;
        if (this.thumb_url) obj.thumb_url =  this.thumb_url;
        if (this.width) obj.width =  this.width;
        if (this.height) obj.height = this.height;
        
        return obj;
    }
}