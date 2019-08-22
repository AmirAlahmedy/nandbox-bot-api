export default class Result {

    id;
    caption;
    title;
    description;
    url;
    thumbUrl;
    type;
    width;
    height;

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

    toJsonObject = () => {
        let obj;

        if (id) obj.id =  id;
        if (caption) obj.caption =  caption;
        if (title) obj.title =  title;
        if (description) obj.description =  description;
        if (url) obj.url =  url;
        if (type) obj.type =  type;
        if (thumbUrl) obj.thumbUrl =  thumbUrl;
        if (width) obj.width =  width;
        if (height) obj.height = height;
        
        return obj;
    }
}