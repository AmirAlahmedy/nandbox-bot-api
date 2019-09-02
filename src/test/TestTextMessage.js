const OutMessage = require("../outmessages/OutMessage");
const NandBoxClient = require("../NandBoxClient");
const NandBox = require("../NandBox");
const Utils = require("../util/Utility");
const Id = Utils.Id;
const Utility = Utils.Utility;
const setChatMenuOutMessage = require("../outmessages/setChatMenuOutMessage");
const Row = require("../data/Row");
const Button = require("../data/Button");
const Menu = require("../data/Menu");
const TextOutMessage = require("../outmessages/TextOutMessage");
const PhotoOutMessage = require("../outmessages/PhotoOutMessage");
const InlineSearchAnswer = require("../outmessages/InlineSearchAnswer");
const Result = require("../data/Result");
const RecallOutMessage = require("../outmessages/RecallOutMessage");
const User = require("../data/User");
const Photo = require("../data/Photo");


const TOKEN = "90091784169275314:0:MPgzj802RbiMZ3RL7GHpwuDp9QxVTq"; // you can put your own bot token
const MAIN_MENU_001 = "MAIN_MENU_001";

let outMsgsListener = new Map();

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

nCallBack.onClose = () => {
    console.log("ONCLOSE");
}

nCallBack.onError = () => {
    console.log("ONERROR");
}

nCallBack.onReceive = incomingMsg => {
    console.log("=========>> " + incomingMsg.type + " Message Received =========>>");
    console.log("incomingMsg.message_id : " + incomingMsg.message_id);
    console.log("incomingMsg.date : " + incomingMsg.date);
    console.log("incomingMsg.reference : " + incomingMsg.reference);
    console.log("incomingMsg.caption: " + incomingMsg.caption);
    if (incomingMsg.sent_to() != null)
        console.log("incomingMsg.sent_to.id : " + incomingMsg.sent_to.id);
    console.log("================start of Chat Object ===================");
    console.log("incomingMsg.chat.id : " + incomingMsg.chat.id);
    console.log("incomingMsg.chat.title :" + incomingMsg.chat.title);
    console.log("incomingMsg.chat.name :" + incomingMsg.chat.name);
    console.log("incomingMsg.chat.type :" + incomingMsg.chat.type);
    console.log("================End of Chat Object ===================");
    console.log("================Start of From User Object ===================");
    console.log("incomingMsg.from.id : " + incomingMsg.from.id);
    console.log("incomingMsg.from.name : " + incomingMsg.from.name);
    console.log("incomingMsg.from.terminal: " + incomingMsg.from.terminal);
    console.log("incomingMsg.from.version : " + incomingMsg.from.version);
    console.log("================End of From User Object ===================");

    // Incoming Text Message
    if (MessageType.text.to() === incomingMsg.type.to())
        handleIncomingTextMsg(incomingMsg);

}

/**
* Handle incoming Text messages
*
* @param incomingMsg
*/
let handleIncomingTextMsg = incomingMsg => {
    console.log("incomingMsg.status " + incomingMsg.status);
    console.log("incomingMsg.text : " + incomingMsg.text);

    if ("3m" == incomingMsg.text.toLowerCase()) {
        let chatId = incomingMsg.chat.id;

        let utility = new Utility;
        utility.setNavigationButton(chatId, "mainMenu", api);

        let menuBtn1 = createButton("Main", "mainCB", 1, "Gray", "Red", null, null);
        let menuBtn2 = createButton("Funny", "funnyCB", 1, "Gray", "Red", null,
            null);
        let menuBtn3 = createButton("Option", "optionCB", 1, "Gray", "Red", null,
            null);

        let outmsg = new setChatMenuOutMessage();

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(menuBtn1, 2);
        firstRow.buttons[1] = new Button(menuBtn2, 2);
        firstRow.buttons[2] = new Button(menuBtn3, 2);


        let chatMenu = new Menu();
        let menuRef = "mainMenu";
        chatMenu.menuRef = menuRef;
        chatMenu.rows[0] = new Row(firstRow, 3);

        outmsg.chatId = incomingMsg.chat.id;
        outmsg.menus = new Menu(chatMenu);

        api.send(outmsg);

    } else if ("1b" == incomingMsg.text.toLocaleLowerCase()) {
        outmsg = new TextOutMessage();
        const reference = Id();

        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = incomingMsg.text;
        outmsg.echo = 1;

        let menuRef = MAIN_MENU_001;
        let oneBtn = createButton("Send me your location", "oneBtnCB", 1, "#A5B8BC", "yellow",
            Button.BUTTON_QUERY_LOCATION, null);

        let firstRow = new Row();
        firstRow.rowOrde = 1;
        firstRow.buttons = new Button(oneBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("1bc" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();

        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = "https://edition.cnn.com/";
        outmsg.WebPagePreview = OutMessage.WEB_PREVIEW_INSTANCE_VIEW;

        outmsg.echo = 1;
        let menuRef = MAIN_MENU_001;
        let oneBtn = createButton("Visit a Milestone", "oneBtnCBInWebView", 1,
            "RED", "White", null, null);
        oneBtn.buttonURL("https://edition.cnn.com/");

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons = new Button(oneBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("2b" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = incomingMsg.text;

        let menuRef = "MAIN_MENU_001";
        let btnOne = createButton("Please Send me your location now ", "RequestLocation",
            1, "RED", "White", Button.BUTTON_QUERY_LOCATION, null);
        let btnTwo = createButton("Send me your Contact", "RequestContact", 2,
            "RED", "White", Button.BUTTON_QUERY_CONTACT, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(btnOne, 2);
        firstRow.buttons[1] = new Button(btnTwo, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("2bc" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = "m.youm7.com";
        outmsg.webPagePreview = OutMessage.WEB_PREVIEW_INSTANCE_VIEW;

        let menuRef = MAIN_MENU_001;
        let btnOne = createButton("Send me your location", "RequestLocation",
            1, "RED", "White", Button.BUTTON_QUERY_LOCATION, null);
        let btnTwo = createButton("Send me your Contact", "RequestContact", 2,
            "RED", "White", Button.BUTTON_QUERY_CONTACT, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(btnOne, 2);
        firstRow.buttons[1] = new Button(btnTwo, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef(menuRef);
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("3b" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = incomingMsg.text;
        outmsg.echo = 1;

        let menuRef = MAIN_MENU_001;
        let btn1 = createButton("Naruto", "NarutoCB", 1, "#A5B8BC", "white", null,
            null);
        let btn2 = createButton("Sasuke", "SasukeCB", 2, "#A5B8BC", "white", null,
            null);
        let btn3 = createButton("Sakura", "SakuraCB", 2, "#A5B8BC", "white", null,
            null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(btn1, 2);
        firstRow.buttons[1] = new Button(btn2, 2);
        firstRow.buttons[2] = new Button(btn3, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("CHPOST" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.from.id; // HEISNBERG CHANNEL
        outmsg.reference = reference;
        outmsg.text = "hello ";
        outmsg.echo = 1;

        let menuRef = "Question1";
        let aBtn = createButton("A", "A", 1, "#A5B8BC", "white", null, "AnswerA");
        let bBtn = createButton("B", "B", 2, "#A5B8BC", "white", null, null);
        let cBtn = createButton("C", "C", 3, "#A5B8BC", "white", null, null);
        let dBtn = createButton("D", "D", 4, "#A5B8BC", "white", null, null);

        // ArrayList of menus
        let questionMenus = createOtherMenus();

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(aBtn, 2);
        firstRow.buttons[1] = new Button(bBtn, 2);

        let secondRow = new Row();
        secondRow.rowOrder = 2;
        secondRow.buttons[0] = new Button(cBtn, 2);
        secondRow.buttons[1] = new Button(dBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);
        inlineMenu.rows[1] = new Row(secondRow, 3);

        questionMenus.push(inlineMenu);

        outmsg.menuRef = menuRef;
        let qMenuArray = [];
        for (let i = 0; i < questionMenus.length(); ++i)
            qMenuArray[i] = new Menu(questionMenus[i], 3);
        outmsg.inlineMenuss = qMenuArray;
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("edit caption" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new PhotoOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.caption = "Old Caption";

        let uploadedPhotoId = MediaTransfer.uploadFile(TOKEN,
            "./upload/welcome.jpg");
        outmsg.photo = uploadedPhotoId;
        let menuRef = MAIN_MENU_001;
        let editCaptionBtn = createButton("Edit Caption", "editCaptionCB", 1,
            "#A5B8BC", "white", null, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(editCaptionBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("edit Text chat" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = "Old Text";

        let menuRef = MAIN_MENU_001;
        let editCaptionBtn = createButton("Edit Text", "editTextChatCB", 1,
            "#A5B8BC", "white", null, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(editCaptionBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("edit Text" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = "Old Text";

        let menuRef = MAIN_MENU_001;
        let editCaptionBtn = createButton("Edit Text", "editTextCB", 1, "#A5B8BC",
            "white", null, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(editCaptionBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.setMenuRef(menuRef);
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("edit caption chat" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new PhotoOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.caption = "Old Caption";

        let uploadedPhotoId = MediaTransfer.uploadFile(TOKEN,
            "./upload/welcome.jpg");
        outmsg.photo = uploadedPhotoId;

        let menuRef = "MAIN_MENU_001";
        let editCaptionBtn = createButton("Edit Caption", "editCaptionChatCB", 1,
            "#A5B8BC", "white", null, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(editCaptionBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows[0] = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("edit Text chat both" == incomingMsg.text.toLocaleLowerCase()) {
        let outmsg = new TextOutMessage();
        const reference = Id();
        outmsg.chatId = incomingMsg.chat.id;
        outmsg.reference = reference;
        outmsg.text = "Old Text";

        let menuRef = MAIN_MENU_001;
        let editCaptionBtn = createButton("Edit Text", "editTextChatCBboth", 1,
            "#A5B8BC", "white", null, null);

        let firstRow = new Row();
        firstRow.rowOrder = 1;
        firstRow.buttons[0] = new Button(editCaptionBtn, 2);

        let inlineMenu = new Menu();
        inlineMenu.menuRef = menuRef;
        inlineMenu.rows = new Row(firstRow, 3);

        outmsg.menuRef = menuRef;
        outmsg.inlineMenus = new Menu(inlineMenu);
        outMsgsListener[reference] = outmsg;

        api.send(outmsg);

    } else if ("i1" == incomingMsg.text.toLocaleLowerCase()) {
        let inlineSearchAnswer = new InlineSearchAnswer();
        inlineSearchAnswer.chatId = incomingMsg.chat.id;
        inlineSearchAnswer.toUserId = incomingMsg.from.id;
        inlineSearchAnswer.searchId = 1;

        let results2 = new Result();
        results2.id = "d2ba4e79f2e240d145e8be48f1ef98ece2f283193bce80f1b7ddbd0e8daae23a.gif";

        results2.caption = "test GIF caption";
        results2.description = "Test GIF desc";
        results2.title = "Test GIF title";

        let results = [];
        results.push(results2);
        inlineSearchAnswer.results = results;

        api.send(inlineSearchAnswer);

    } else if ("i3" == incomingMsg.text.toLocaleLowerCase()) {
        let inlineSearchAnswer = new InlineSearchAnswer();
        inlineSearchAnswer.chatId = incomingMsg.chat.id;
        inlineSearchAnswer.toUserId = incomingMsg.from.id;
        inlineSearchAnswer.searchId = 1;

        let results = new Result();
        results.id = "8b6229eefde75174b6cb5474b38e7f2f55a280a17ccc1f18a3ed6f5416890070.mp4";
        results.caption = "test Video caption";
        results.description = "Test Video desc";
        results.title = "Test Video title";

        let results2 = new Result();
        results2.id = "d2ba4e79f2e240d145e8be48f1ef98ece2f283193bce80f1b7ddbd0e8daae23a.gif";
        results2.caption = "test GIF caption";
        results2.description = "Test GIF desc";
        results2.title = "Test GIF title";

        let results3 = new Result();
        results3.id = "4bdb5b65838706092cff9de33694641aa0b7a02899b0884d07df2f58374bf40d.jpg";
        results3.caption = "test Photo caption";
        results3.description = "Test Photo desc";
        results3.title = "Test Photo title";

        let multiResults = [];
        multiResults.push(results3);
        multiResults.push(results2);
        multiResults.push(results);
        inlineSearchAnswer.results(multiResults);

        api.send(inlineSearchAnswer);

    } else if ("GCA" == incomingMsg.text.toLocaleLowerCase()) {
        let chatId = "90090684275605648";
        api.getChatAdministrators(chatId);
    } else if ("GU" == incomingMsg.text.toLocaleLowerCase()) {
        let userId = "90089584980037358";
        api.getUser(userId);
    } else if ("GC" == incomingMsg.text.toLocaleLowerCase()) {
        let chatId = "90089584980037358";
        api.getChat(chatId);
    } else if ("GCM" == incomingMsg.text.toLocaleLowerCase()) {
        let chatId = "90089584806788930";
        let userId = "90090684275605648";
        api.getChatMember(chatId, userId);
    } else if ("BCM" == incomingMsg.text.toLocaleLowerCase()) {
        let chatId = "90089584806788930";
        let userId = "90090684275605648";
        api.banChatMember(chatId, userId);
    } else if ("UCM" == incomingMsg.text.toLocaleLowerCase()) {
        let chatId = "90089584806788930";
        let userId = "90090684275605648";
        api.unbanChatMember(chatId, userId);
    } else if ("RCM" == incomingMsg.text.toLocaleLowerCase()) {
        let chatId = "90089584806788930";
        let userId = "90090684275605648";
        api.removeChatMember(chatId, userId);
    } else if ("SC" == incomingMsg.text.toLocaleLowerCase()) {
        let chat = new Chat();
        chat.title = "NEW TITLE";
        chat.td = "90090684268836495";
        api.setChat(chat);
    } else if ("RC" == incomingMsg.text.toLocaleLowerCase()) {
        let recallOutMessage = new RecallOutMessage();
        recallOutMessage.chatId = "90090684265384780";
        recallOutMessage.messageId = "d1_CIRKHD6C12617260";
        recallOutMessage.reference = 6915;
        recallOutMessage.setFromUserId = "90089584801498185";

        api.send(recallOutMessage);

    } else if ("GMP" == incomingMsg.text.toLocaleLowerCase()) {
        api.getMyProfiles();
    } else if ("SMP" == incomingMsg.text.toLocaleLowerCase()) {
        let user = new User();
        user.profile = "other";
        user.status = "I am set My profile Bot 2 ";
        let photo = new Photo();
        photo.id = "e801b7277dbd921376f26b13aeadf0ee4b49950a66641f2761863a823e035845.jpg";

        api.setMyProifle(user);
    } else if ("linkPreview" == incomingMsg.text.toLocaleLowerCase()) {
        try {
            //TODO: sleep
            //Thread.sleep(5000L);
        } catch (e) {
            console.log(new Error().stack);
            console.log(e);
        }
        api.sendText(incomingMsg.chat.id, "Link without prview http://www.nandbox.com", Id(), null, null, OutMessage.WEB_PREVIEW_DISABLE, true, null, null);
        api.sendText(incomingMsg.chat.id, "Link with prview http://www.nandbox.com", Id(), null, null, null, true, null, null);
    } else if ("getChatAdmins" == incomingMsg.text.toLocaleLowerCase()) {
        api.getChatAdministrators(incomingMsg.getChat().getId());
    } else if ("getMyProfile" == incomingMsg.text.toLocaleLowerCase()) {
        api.getMyProfiles();
    }
}

createOtherMenus = () => {
    otherMenus = [];
    let answerA = new Menu();
    answerA.menuRef = "AnswerA";

    let aAnswerRow = new Row();
    let backRow = new Row();

    let youAnsweredABtn = createButton("You answered A", "AnsweredAMessage", 1,
        "#A5B8BC", "white", null, null);
    let backBtn = createButton("Back", "AnsweredAMessage", 1, "#A5B8BC", "white",
        null, "Question1");

    aAnswerRow.buttons[0] = new Button(youAnsweredABtn, 2);
    backRow.buttons[1] = new Button(backBtn, 2);

    answerA.rows[0] = new Row(aAnswerRow, 3);
    answerA.rows[1] = new Row(backRow, 3);

    otherMenus.push(answerA);

    return otherMenus;
}

let createButton = (label, callback, order, bgColor,
    txtColor, buttonQuery, nextMenuRef) => {
    let btn = new Button();

    btn.buttonLabel = label;
    btn.buttonOrder = order;
    btn.buttonCallBack = callback;
    btn.buttonBgColor = bgColor;
    btn.buttonTextColor = txtColor;
    btn.buttonQuery = buttonQuery;
    btn.nextMenu = nextMenuRef;

    return btn;
}

onInlineMessageCallback = (inlineMsgCallback) => {

    let msgId = inlineMsgCallback.messageId;
    let chatId = inlineMsgCallback.chat.id;
    let userId = inlineMsgCallback.from.id;

    if (inlineMsgCallback.buttonCallback == "NarutoCB") api.sendText(chatId, "Rasengan !!!");
    if (inlineMsgCallback.buttonCallback == "SasukeCB") api.sendText(chatId, "Chidori z-z-z ");
    if (inlineMsgCallback.buttonCallback == "SakuraCB") api.sendText(chatId, "Shannaro (*_*)");
    if (inlineMsgCallback.buttonCallback == "editCaptionCB") api.updateMediaCaption(msgId, "My New Caption ", userId);
    if (inlineMsgCallback.buttonCallback == "editTextCB") api.updateTextMsg(msgId, "My New Text ", userId);
    if (inlineMsgCallback.buttonCallback == "editTextChatCB") api.updateChatMsg(msgId, "My New Text in group ", chatId);
    if (inlineMsgCallback.buttonCallback == "editCaptionChatCB") api.updateChatMsg(msgId, "My New Caption in group ", chatId);
    if (inlineMsgCallback.buttonCallback == "editTextChatCBboth") api.updateMessage(msgId, "my new message", null, userId, chatId);
}

onMessagAckCallback = msgAck => {
    let reference = msgAck.reference;

    let removedOutMsg = outMsgsListener[reference];
    outMsgsListener.delete(reference);

    console.log("***** Ack for Message with Reference : " + reference);
    if (removedOutMsg != null) {
        console.log("***** Removed Out Message from Resource Listener : "
            + removedOutMsg.toJsonObject());
    }

}

onChatMenuCallBack = chatMenuCallback => {

    console.log("ChatMenuCB : " + chatMenuCallback.toJsonObject());

    let chatId = chatMenuCallback.chat.id;

    if (chatMenuCallback.buttonCallback == "optionCB") api.sendText(chatId, "Coming soon");
    if (chatMenuCallback.buttonCallback == "mainCB") api.sendText(chatId, "Main menu");
    if (chatMenuCallback.buttonCallback == "funnyCB") api.sendText(chatId, "Why are frogs always so happy? They eat what ever bugs them");

}

onChatMember = chatMember => {
    console.log("type >>" + chatMember.type);
    console.log("status >>" + chatMember.status);
    console.log("chat.id >>" + chatMember.chat.id);
    console.log("user.id >>" + chatMember.user.id);
    console.log("memberSince >>" + chatMember.memberSince);
}


onMyProfile = myprofile => {
    console.log("getUser id " + myprofile.getId());
    console.log("getName " + myprofile.getName());
    console.log("terminal " + myprofile.terminal());
    console.log("getProfile " + myprofile.getProfile());
    if (myprofile.getPhoto() != null) {
        console.log("Photo().getId " + myprofile.getPhoto().getId());
    }

}

onChatAdministrators = chatAdministrators => {
    console.log("ChatAdministrators " + chatAdministrators.chat.id);

    for (let i = 0; i < chatAdministrators.administrators.length; i++) {
        console.log("admin user id number" + (1 + i) + " >>>"
            + chatAdministrators.administrators()[i].id);
    }
}


onUserDetails = user => console.log("USER ID = " + user.getId());
onUserJoinedBot = user => console.log("User ID =" + user.getId());
userStartedBot = user => console.log("User ID = " + user.getId());
userStoppedBot = user => console.log("User ID =" + user.getId());
userLeftBot = user => console.log("User ID =" + user.getId());

permanentUrl = permenantUrl => { }
onChatDetails = chat => { }
onInlineSearh = inlineSearch => { }