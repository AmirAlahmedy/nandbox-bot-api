const NandBox = require("../NandBox");
const Nand = require("../NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;

let TOKEN = "90091784656342996:0:90eH09mTSJ4ME9A77AuDJjhEzDCqHF";// you can put your own bot token
let CHAT_SETTINGS = 1;
let FROM_ADMIN = 1;
let TEXT = "text";
let CONTACT = "Contact";

const config = {
    URI: "wss://d1.nandbox.net:5020/nandbox/api/",
    DownloadServer: "https://d1.nandbox.net:5020/nandbox/download/",
    UploadServer: "https://d1.nandbox.net:5020/nandbox/upload/"
}
var client = NandBoxClient.get(config);
var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    api = _api;
    console.log("ONCONNECT");
}
nCallBack.onReceive = incomingMsg => {
    try {
        if (incomingMsg.chat.type  == CONTACT || CHAT_SETTINGS == incomingMsg.chatSettings
                && FROM_ADMIN == incomingMsg.fromAdmin ) {
            let chatId = incomingMsg.chat.id;
            let incomingText = incomingMsg.text;
            if (TEXT == incomingMsg.type) {

                if (!incomingText.includes("&") || !incomingText.includes("=")) {

                    api.sendText(chatId,"Invalid command , command format : webview=<WEB_VIEW_FLAG from 1 to 4>&link=<ANY WEB LINK>");

                } else {
                    let data = incomingText.split("&");
                    let msgsCount = data[0].split("=")[1];
                    let format = data[1].split("=")[1];

                    if ("larg" =- format.toLowerCase()) {
                        for (let i = 0; i < msgsCount; i++) {
                            api.sendText(chatId, i + 1, Id(), null, null, null, null, null, getRandomColorString());
                            //TODO: sleep
                            //Thread.sleep(500);
                        }
                    }
                    else {
                        for (let i = 0; i < msgsCount; i++) {
                            api.sendText(chatId, i + 1, Id(), null, null, null, null, null, null);
                        }
                    }
                }
            }
        }
    } catch (excp) {
        consolel.log(new Error().stack);
        console.log(excp);
        api.sendText(incomingMsg.chat.id,
            "Invalid command , command format : webview=<WEB_VIEW_FLAG from 1 to 4>&link=<ANY WEB LINK>");
    }
}
nCallBack.onReceiveObj = obj => { }
nCallBack.onClose = () => console.log("ONCLOSE");
nCallBack.onError = () => console.log("ONERROR");
nCallBack.onChatMenuCallBack = chatMenuCallback => { 
    console.log("ChatMenuCB : " + chatMenuCallback.toJsonObject());

    let chatId = chatMenuCallback.getChat().id;

    if (chatMenuCallback.buttonCallback == "optionCB") api.sendText(chatId, "Coming soon");
    if (chatMenuCallback.buttonCallback == "mainCB") api.sendText(chatId, "Main menu");
    if (chatMenuCallback.buttonCallback == "funnyCB") api.sendText(chatId, "Why are frogs always so happy? They eat what ever bugs them");
    
}
nCallBack.onInlineMessageCallback = inlineMsgCallback => { }
nCallBack.onMessagAckCallback = msgAck => { }
nCallBack.onChatMember = chatMember => {
    console.log("type >>" + chatMember.type);
    console.log("status >>" + chatMember.status);
    console.log("chat.id >>" + chatMember.chat.id);
    console.log("user.id >>" + chatMember.user.id);
    console.log("memberSince >>" + chatMember.memberSince);
}
nCallBack.onChatAdministrators = chatAdministrators => {
    console.log("ChatAdministrators " + chatAdministrators.chat.id);

    for (let i = 0; i < chatAdministrators.administrators.length; i++) {
        console.log("admin user id number" + (1 + i) + " >>>"
        + chatAdministrators.administrators()[i].id);
    }
}
nCallBack.onMyProfile = user => {
    console.log("user.id " + myprofile.id);
    console.log("name " + myprofile.name);
    console.log("terminal " + myprofile.terminal);
    console.log("profile " + myprofile.profile);
    if (myprofile.photo != null) console.log("photo.id " + myprofile.photo.id);
}
nCallBack.onUserDetails = user => console.log("USER ID = " + user.id);
nCallBack.onUserJoinedBot = user => console.log("User ID =" + user.id);
nCallBack.userStartedBot = user => console.log("User ID = " + user.id);
nCallBack.userStoppedBot = user => console.log("User ID =" + user.id);
nCallBack.userLeftBot = user => console.log("User ID =" + user.id);

nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { }
nCallBack.onInlineSearh = inlineSearch => { }


client.connect(TOKEN, nCallBack);

getRandomColorString = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) 
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}