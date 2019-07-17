

export default class MessageAck {

    messageId;
    date;
    reference;

    constructor(jsonObj) {
        let obj = {};

        obj.ack = jsonObj.ack;
        this.messageId = obj.message_id;
        this.reference = obj.reference;
        //TODO:  Utils.getLong(obj.date)
        this.date = obj.date;
    }

    toJsonObject = () => {
        let obj = {};

        if (date) {
            obj.date = this.date
        }
        if (messageId) {

            obj.message_id = this.messageId;
        }
        if (reference)
            obj.reference = this.reference;

        console.log("to " + JSON.stringify(obj));
        return obj;
    }
    
}