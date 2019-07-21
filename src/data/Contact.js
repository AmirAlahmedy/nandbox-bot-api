/**
 * This class represents incoming Message used to get Contact Message .
 *
 * @author Hossam @author Amir
 * 
 */
export default class Contact {

    name;
    phoneNumber;

    constructor(obj) {
        this.name = obj.name;
        this.phoneNumber = obj.phone_number;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.name) obj.name = this.name;
        if (this.phoneNumber) obj.phone_number = this.phoneNumber;

        return obj;
    }

    toString = () => {
        let outStrBuf = new String();
        outStrBuf += "{\n";

        if (this.name) outStrBuf += "\"" + "name" + "\":\"" + this.name + "\n";
        if (this.phoneNumber) outStrBuf += "\"" + "phone_number" + "\":\"" + this.phoneNumber + "\n";

        outStrBuf += "}";
        return outStrBuf.toString();
    }
}