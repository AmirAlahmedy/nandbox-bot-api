import OutMessage from "./OutMessage";

/**
 *
 * This class represents Output Message used to send Chat Menu
 *
 * @author Hossam Mohamed, Amir
 *
 */
export default class SetChatMenuOutMessage extends OutMessage {

    menus = [];

    constructor() {
        this.method = "setChatMenu";
    }

    toJsonObject = () => {
        let obj = super.toJsonObject();
        if (menus) {
            let menusArrayObj = [];
            for (let i = 0; i < menus.length; ++i)
                menusArrayObj[i] = menus[i].toJsonObject();

            //menusArrayObj = JSON.parse(menusArrayObj.toString());
            obj.menus = menusArrayObj;
        }
        return obj;
    }
}