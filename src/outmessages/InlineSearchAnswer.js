const OutMessage = require("./OutMessage");

module.exports = class InlineSearchAnswer extends OutMessage{

    constructor() {
        this.method = "inlineSearchAnswer";
    }

    toJsonObject(){
        let obj = super.toJsonObject();

        if (this.results) {
            let resultArrayObj = [];
            for (let i = 0; i < results.length(); i++) {
                resultArrayObj.push(results[i].toJsonObject());
            }
            obj.results = resultArrayObj;
        }

        if (this.searchId) obj.search_id = searchId;
        if (this.nextOffset) obj.next_offset = nextOffset;

        return obj;
    }
}