/**
 * This class represents incoming Message used to get Audio Message .
 *
 * @author Ahmed A. El-Malatawy @author Amir
 *
 */
export default class Audio {
    id;
    title;
    performer;
    size;
    duration;

    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.performer = obj.performer;
        this.size = obj.size;
        this.duration = obj.duration;
    }

    toJsonObject = () => {
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.title) obj.title = this.title;
        if (this.performer) obj.performer = this.performer;
        if (this.size) obj.size = this.size;
        if (this.duration) obj.duration = this.duration;

        return obj;
    }
}