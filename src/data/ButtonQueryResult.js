export default class ButtonQueryResult {

    latitude;
    longitude;
    contact;

    constructor(obj) {
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.contact = obj.contact;
    }

    toJsonObject = () => {
        let obj;

        if (latitude) obj.latitude  = latitude;
        if (longitude) obj.longitude = longitude;
        if (contact) obj.contact = contact;

        return obj;
    }
}