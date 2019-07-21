/**
 * This class represents incoming Message used to get Location Message .
 *
 * @author Hossam @author Amir
 *
 */
export default class Location {
    longitude;
    latitude;
    name;
    details;

    constructor(obj) {
        this.name = obj.name;
        this.details = obj.details;
        this.longitude = obj.longitude;
        this.latitude = obj.latitude;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.name) obj.name = this.name;
        if (this.details) obj.details = this.details;
        if (this.longitude) obj.longitude = this.longitude;
        if (this.latitude) obj.latitude = this.latitude;

        return obj;
    }

    toString = () => {
        let outStrBuf = new String();
        outStrBuf += "{\n";

        if (this.name) outStrBuf += "\"" + "name" + "\":\"" + this.name + "\n";
        if (this.details) outStrBuf += "\"" + "details" + "\":\"" + this.details + "\n";
        if (this.longitude) outStrBuf += "\"" + "longitude" + "\":\"" + this.longitude + "\n";
        if (this.latitude) outStrBuf += "\"" + "latitude" + "\":\"" + latitude + "\n";

        outStrBuf += "}";
        return outStrBuf.toString();
    }
}