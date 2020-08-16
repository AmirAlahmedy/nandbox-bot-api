module.exports = class MessageAck {

    constructor(jsonObj) {
        let obj = {};

        obj = jsonObj.ack;
        this.message_id = obj.message_id;
        this.reference = obj.reference;
        //TODO:  Utils.getLong(obj.date)
        this.date = obj.date;
    }

    toJsonObject(){
        let obj = {};

        if (this.date) obj.date = this.date
        if (this.message_id) obj.message_id = this.message_id;
        if (this.reference) obj.reference = this.reference;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }
    
}