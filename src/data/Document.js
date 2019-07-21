/**
 * This class represents incoming Message used to get Document Message .
 *
 * @author Hossam @author Amir
 *
 */
export default class Doc {
    id;
    name;
    size;

    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.size = obj.size;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.name) obj.name = this.name;
        if (this.id) obj.id = this.id;
        if (this.size) obj.size = this.size;

        return obj;
    }

    toString = () => {
        let outStrBuf = new String();
        outStrBuf += "{\n";

        if (this.id) outStrBuf += "\"" + "id" + "\":\"" + this.id + "\n";
        if (this.name) outStrBuf += "\"" + "name" + "\":\"" + this.name + "\n";
        if (this.size) outStrBuf += "\"" + "size" + "\":\"" + size + "\n";

        outStrBuf += "}";
        return outStrBuf.toString();
    }
}