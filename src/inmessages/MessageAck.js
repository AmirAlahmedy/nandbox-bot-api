export default class MessageAck {

    message_id;
    date;
    reference;

    constructor(jsonObj) {
        let obj = {};

        obj = jsonObj.ack;
        this.message_id = obj.message_id;
        this.reference = obj.reference;
        //TODO:  Utils.getLong(obj.date)
        this.date = obj.date;
    }

    toJsonObject = () => {
        let obj = {};

        if (date) {
            obj.date = this.date
        }
        if (message_id) {

            obj.message_id = this.message_id;
        }
        if (reference)
            obj.reference = this.reference;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }
    
}