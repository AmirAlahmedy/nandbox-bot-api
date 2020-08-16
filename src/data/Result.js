module.exports = class Result {

    constructor(obj) {
        if (!obj) return;

        this.id = obj.id;
        this.caption = obj.caption;
        this.title = obj.title;
        this.description = obj.description;
        this.url = obj.url;
        this.type = obj.type;
        this.thumbUrl = obj.thumbUrl;
        
        this.width = obj.width;
        this.height = obj.height;		
    }

    toJsonObject(){
        let obj;

        if (this.id) obj.id =  id;
        if (this.caption) obj.caption =  caption;
        if (this.title) obj.title =  title;
        if (this.description) obj.description =  description;
        if (this.url) obj.url =  url;
        if (this.type) obj.type =  type;
        if (this.thumbUrl) obj.thumbUrl =  thumbUrl;
        if (this.width) obj.width =  width;
        if (this.height) obj.height = height;
        
        return obj;
    }
}