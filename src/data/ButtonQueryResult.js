module.exports = class ButtonQueryResult {


    constructor(obj) {
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.contact = obj.contact;
    }

    toJsonObject(){
        let obj;

        if (this.latitude) obj.latitude  = latitude;
        if (this.longitude) obj.longitude = longitude;
        if (this.contact) obj.contact = contact;

        return obj;
    }
}