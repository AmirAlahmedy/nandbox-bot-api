const OutMessage = require("./OutMessage");

module.exports = class InlineSearchAnswer extends OutMessage{

    constructor() {
        this.method = "inlineSearchAnswer";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (results) {
            let resultArrayObj = [];
            for (let i = 0; i < results.length(); i++) {
                resultArrayObj.push(results[i].toJsonObject());
            }
            obj.results = resultArrayObj;
        }

        if (searchId) obj.search_id = searchId;
        if (nextOffset) obj.next_offset = nextOffset;

        return obj;
    }
}