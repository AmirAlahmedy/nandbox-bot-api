"use strict";
import NandBox from "../NandBox";
import { NandBoxClient } from "../NandBoxClient";
import TextOutMessage from "../outmessages/TextOutMessage";
import { Id, Utility } from "../util/Utility";
import OutMessage from "../outmessages/OutMessage";
import Menu from "../data/Menu";
import Row from "../data/Row";
import SetChatMenuOutMessage from "../outmessages/setChatMenuOutMessage";
import DocumentOutMessage from "../outmessages/DocumentOutMessage";
import MediaTransfer from "../util/MediaTransfer";
import ContactOutMessage from "../outmessages/ContactOutMessage";
import LocationOutMessage from "../outmessages/LocationOutMessage";
import GifOutMessage from "../outmessages/GifOutMessage";
import AudioOutMessage from "../outmessages/AudioOutMessage";
import VoiceOutMessage from "../outmessages/VoiceOutMessage";
import VideoOutMessage from "../outmessages/VideoOutMessage";
import PhotoOutMessage from "../outmessages/PhotoOutMessage";
import Button from "../data/Button";

let TOKEN = "90091783927225986:0:PjAudagHdpEDxpIJOGKdNB1X6Og4WA"; // you can put your own bot token
let MAIN_MENU_001 = "MAIN_MENU_001";
let outMsgsListener = new Map();

var client = NandBoxClient.get();



var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    api = _api;
    console.log("ONCONNECT");
}



nCallBack.onReceive = incomingMsg => {
    if (incomingMsg.replyToMessageId) {
        if (incomingMsg.isTextMsg()) {
            if (incomingMsg.text.toLowerCase() == "getChatMember".toLowerCase()) {
                api.getChatMember(incomingMsg.chat.id, incomingMsg.from.id);
            }
            else if (incomingMsg.text == "getAdmins") {
                api.getChatAdministrators(incomingMsg.chat.id);
            }
            else if (incomingMsg.text.toLowerCase() == "getChat".toLowerCase()) {
                api.getChat(incomingMsg.chat.id);
            }
            else if (incomingMsg.text.toLowerCase() == "BigText".toLowerCase()) {
                api.sendTextWithBackground(incomingMsg.chat.id, "Hi From Bot", "#EE82EE");
            }
        }
    } else {
        console.log("=========>> " + incomingMsg.type + " Message Received =========>>");
        console.log("incomingMsg.messageId : " + incomingMsg.messageId);
        console.log("incomingMsg.date : " + incomingMsg.date);
        console.log("incomingMsg.reference : " + incomingMsg.reference);
        console.log("incomingMsg.caption: " + incomingMsg.caption);
        if (incomingMsg.sentTo)
            console.log("incomingMsg.sentTo.id : " + incomingMsg.sentTo.id);
        console.log("================start of Chat Object ===================");
        console.log("incomingMsg.chat.id : " + incomingMsg.chat.id);
        console.log("incomingMsg.chat.title :" + incomingMsg.chat.title);
        console.log("incomingMsg.chat.name :" + incomingMsg.chat.name);
        console.log("incomingMsg.chat.type :" + incomingMsg.chat.type);
        console.log("================End of Chat Object ===================");
        console.log("================Start of From User Object ===================");
        console.log("incomingMsg.from.id : " + incomingMsg.from.id);
        console.log("incomingMsg.from.name : " + incomingMsg.from.name);
        console.log("incomingMsg.from.status: " + incomingMsg.from.status);
        console.log("incomingMsg.from.version : " + incomingMsg.from.version);
        console.log("incomingMsg.from.type : " + incomingMsg.from.type);
        console.log("================End of From User Object ===================");

        if (incomingMsg.isTextMsg()) {
            if (incomingMsg.text.toLowerCase() == "getMyProfile".toLowerCase()) {
                api.getMyProfiles();
            }
            else if (incomingMsg.text.toLowerCase() == "getChat".toLowerCase()) {
                api.getChat(incomingMsg.chat.id);
            }
            else if (incomingMsg.text.toLowerCase() == "getUser".toLowerCase()) {
                api.getUser(incomingMsg.from.id);
            } else if ("1bc" == incomingMsg.text.toLowerCase()) {
                let outmsg = new TextOutMessage();
                const reference = Id();
                outmsg.chatId = incomingMsg.chat.id;
                outmsg.reference = reference;
                outmsg.text = "https://edition.cnn.com/";
                outmsg.webPagePrevie = OutMessage.WEB_PREVIEW_INSTANCE_VIEW;
                outmsg.echo = 1;

                let menuRef = MAIN_MENU_001;
                let oneBtn = createButton("", "oneBtnCBInWebView", 1, "RED", "White", null, null);
                oneBtn.buttonIcon = "ic_ball_ic_24dp";
                oneBtn.buttonIconBgColor = "#FFFF44";

                let firstRow = new Row();
                firstRow.rowOrder = 1;
                firstRow.buttons[0] = new Button(oneBtn, 2);

                let inlineMenu = new Menu();
                inlineMenu.menuRef = menuRef;
                inlineMenu.rows[0] = new Row(firstRow, 3);
                outmsg.menuRef = menuRef;
                outmsg.inlineMenus = new Menu(inlineMenu);

                api.send(outmsg);

            } else if ("3bc" == incomingMsg.text.toLowerCase()) {
                let outmsg = new TextOutMessage();
                let reference = Id();
                outmsg.chatId = incomingMsg.chat.id;
                outmsg.reference = reference;
                outmsg.text = "https://edition.cnn.com/";
                outmsg.webPagePreview = OutMessage.WEB_PREVIEW_INSTANCE_VIEW;
                outmsg.echo = 1;

                let menuRef = MAIN_MENU_001;
                let oneBtn = createButton("Visit a Milestone", "oneBtnCBInWebView", 1, "RED", "White", null, null);
                let secondBtn = createButton("Cairo Porto Mall", "secondBtn", 1, "RED", "White", null, null);
                let thirdButton = createButton("Seven Stars Mall", "thirdBtn", 1, "RED", "White", null, null);
                oneBtn.buttonURL = "https://edition.cnn.com/";

                let firstRow = new Row();
                firstRow.rowOrder = 1;
                firstRow.buttons[0] = new Button(oneBtn, 2);
                firstRow.buttons[1] = new Button(secondBtn, 2);
                firstRow.buttons[3] = new Button(thirdButton, 2);

                let inlineMenu = new Menu();
                inlineMenu.menuRef = menuRef;
                inlineMenu.rows[0] = new Row(firstRow, 3);
                outmsg.menuRef = menuRef;
                outmsg.inlineMenus = new Menu(inlineMenu);

                api.send(outmsg);

            } else if ("buttonIcon".toLocaleLowerCase() == incomingMsg.text.toLowerCase()) {
                let outmsg = new TextOutMessage();
                let reference = Id();
                outmsg.chatId = incomingMsg.chat.id;
                outmsg.reference = reference;
                outmsg.text = "https://edition.cnn.com/";
                outmsg.webPagePreview = OutMessage.WEB_PREVIEW_INSTANCE_VIEW;
                outmsg.echo = 1;

                let menuRef = MAIN_MENU_001;
                let oneBtn = createButton("RSS", "oneBtnCBInWebView", 1, "RED", "White", null, null);
                oneBtn.buttonIcon("ic_mood_bad_24dp");
                oneBtn.buttonIconBgColor("#FFFF44");
                let secondBtn = createButton("Calendar", "secondBtn", 1, "RED", "White", null, null);
                secondBtn.buttonIcon("ic_hourglass_full_24dp");
                secondBtn.buttonIconBgColor("White");
                let thirdButton = createButton("Feed", "thirdBtn", 1, "RED", "White", null, null);
                thirdButton.buttonIcon("ic_credit_card_24dp");
                thirdButton.buttonIconBgColor("Yellow");
                thirdButton.buttonURL("https://edition.cnn.com/");

                let firstRow = new Row();
                firstRow.rowOrder = 1;
                firstRow.buttons[0] = new Button(oneBtn, 2);
                firstRow.buttons[1] = new Button(secondBtn, 2);
                firstRow.buttons[3] = new Button(thirdButton, 2);

                let inlineMenu = new Menu();
                inlineMenu.menuRef = menuRef;
                inlineMenu.rows[0] = new Row(firstRow, 3);
                outmsg.menuRef = menuRef;
                outmsg.inlineMenus = new Menu(inlineMenu);

                api.send(outmsg);

            } else if ("3m" == incomingMsg.text) {


                let chatId = incomingMsg.chat.id;

                let utility = new Utility();
                utility.setNavigationButton(chatId, "mainMenu", api);

                let menuBtn1 = createButton("Ù…ØµØ±Ø§ÙˆÙŠ", "mainCB", 1, "Gray", "Red", null, null);
                menuBtn1.buttonIcon("ic_smoke_free_24dp");
                menuBtn1.buttonIconBgColor("#00FFFF");
                let menuBtn2 = createButton("Funny", "funnyCB", 1, "Gray", "Red", null, null);
                menuBtn2.buttonIcon("ic_timeline_24dp");
                let menuBtn3 = createButton("Option", "optionCB", 1, "Gray", "Red", null, null);
                menuBtn3.buttonIcon("ic_pregnant_woman_24dp");
                menuBtn3.buttonIconBgColor("orange");

                let outmsg = new SetChatMenuOutMessage();

                let firstRow = new Row();
                firstRow.rowOrder = 1;
                firstRow.buttons[0] = new Button(menuBtn1, 2);
                firstRow.buttons[1] = new Button(menuBtn2, 2);
                firstRow.buttons[2] = new Button(menuBtn3, 2);

                let chatMenu = new Menu();
                let menuRef = "mainMenu";
                chatMenu.menuRef = menuRef;
                chatMenu.rows[0] = new Row(firstRow, 3);

                outmsg.chatId(incomingMsg.chat.id);
                outmsg.menus[0] = new Menu(chatMenu);

                api.send(outmsg);

            } else {
                api.sendText(incomingMsg.chat.id, incomingMsg.text);
            }
        }
        // Incoming Text File Message
        if (incomingMsg.isTextFileMsg()) handleIncomingTextFileMsg(incomingMsg);

        // Incoming Photo Message
        else if (incomingMsg.isPhotoMsg()) handleIncomingPhotoMsg(incomingMsg);

        // Incoming Video Message
        else if (incomingMsg.isVideoMsg()) handleIncomingVideoMsg(incomingMsg);

        // Incoming Voice Message
        else if (incomingMsg.isVoiceMsg()) handleIncomingVoiceMsg(incomingMsg);

        // Incoming Audio Message
        else if (incomingMsg.isAudioMsg()) handleIncomingAudioMsg(incomingMsg);

        // Incoming Gif Message
        else if (incomingMsg.isGifMsg()) handleIncomingGifMsg(incomingMsg);

        // Incoming Location Message
        else if (incomingMsg.isLocationMsg()) handleIncomingLocationMsg(incomingMsg);

        // Incoming Contact Message
        else if (incomingMsg.isContactMsg()) handleIncomingContactMsg(incomingMsg);

        // Incoming Document Message
        else if (incomingMsg.isDocumentMsg()) handleIncomingDocumentMsg(incomingMsg);

    }

}


nCallBack.onClose = () => console.log("ONCLOSE");
nCallBack.onError = () => console.log("ONERROR");
nCallBack.onInlineMessageCallback = inlineMsgCallback => console.log(inlineMsgCallback.toJsonObject());
nCallBack.onChatDetails = chat => console.log("Chat Title : " + chat.title);
nCallBack.onReceiveObj = obj => console.log("received object: ", obj);

nCallBack.onMessagAckCallback = msgAck => {

    let reference = msgAck.reference;

    let removedOutMsg = outMsgsListener[reference];
    outMsgsListener.delete(reference);

    console.log("***** Ack for Message with Reference : " + reference);
    if (removedOutMsg)
        console.log("***** Removed Out Message from Resource Listener" + removedOutMsg.toJsonObject());

}


nCallBack.onChatMember = chatMember => {

    console.log("Chat Member Details received : ");
    console.log("Chat Id : " + chatMember.chat.id);
    api.getChat(chatMember.chat.id);
    console.log("User Id : " + chatMember.user.id);
    api.getUser(chatMember.user.id);

}

nCallBack.onChatAdministrators = chatAdministrators => {

    for (let i = 0; i < chatAdministrators.administrators.length; i++) {
        let user = chatAdministrators.administrators[i];
        api.sendText(user.id, "Hi from Multiple tests bot");
        api.getUser(user.id);
        console.log(user.toJsonObject());
    }
}

nCallBack.onMyProfile = user => {

    console.log("user.name : " + user.name);
    console.log("user.profile : " + user.profile);
    console.log("user.isBot : " + user.isBot);
    console.log("user.version : " + user.version);

}

nCallBack.onUserDetails = user => {

    console.log("User Name : " + user.name);
    console.log("User Type : " + user.type);

}

nCallBack.permanentUrl = permenantUrl => {

    console.log("File ID is : " + permenantUrl.file);
    console.log("File public URL  is : " + permenantUrl.url);
    console.log("Param1  is : " + permenantUrl.param1);

}

client.connect(TOKEN, nCallBack);

let handleIncomingDocumentMsg = incomingMsg => {

    console.log("================start of Document Object ===================");
    console.log("incomingMsg._document.id : " + incomingMsg._document.id);
    console.log("incomingMsg._document.name : " + incomingMsg._document.name);
    console.log("incomingMsg._document.size : " + incomingMsg._document.size);

    let documentOutMsg = new DocumentOutMessage();
    documentOutMsg.chatId = incomingMsg.chat.id;
    documentOutMsg.reference = Id();
    documentOutMsg._document = incomingMsg._document.id;
    documentOutMsg.name = "Document renamed inside Bot";
    documentOutMsg.caption = "Document From Bot";

    api.send(documentOutMsg);

    // send Document using sendDocument

    let uploadedDocumentId = (new MediaTransfer()).uploadFile(TOKEN, "./upload/welcome.jpg");

    api.sendDocument(incomingMsg.chat.id, uploadedDocumentId,
        "Document Caption");
    api.sendDocument(incomingMsg.chat.id, uploadedDocumentId, Id(),
        "Send doc with ref");
    api.sendDocument(incomingMsg.chat.id, uploadedDocumentId, Id(), null, null, null,
        null, "from all option send", null, null, null);
    api.sendText(incomingMsg.chat.id,
        "Document size : " + incomingMsg._document.size
        + " , Document File Name is : "
        + incomingMsg._document.name + " , Document File ID is : "
        + incomingMsg._document.id);

}

let handleIncomingContactMsg = incomingMsg => {

    console.log("================start of Contact Object ===================");
    console.log("incomingMsg.contact.name : " + incomingMsg.contact.name);
    console.log("incomingMsg.contact.phoneNumber : " + incomingMsg.contact.phoneNumber);

    // send contatc using ContactOutMessage object
    let contactOutMsg = new ContactOutMessage();
    contactOutMsg.chatId = incomingMsg.chat.id;
    contactOutMsg.reference = Id;
    contactOutMsg.name = incomingMsg.contact.name;
    contactOutMsg.phoneNumber = incomingMsg.contact.phoneNumber;

    api.send(contactOutMsg);

    // send contatc using sendContact
    api.sendContact(incomingMsg.chat.id,
        incomingMsg.contact.phoneNumber,
        incomingMsg.contact.name);

    api.sendContact(incomingMsg.chat.id,
        incomingMsg.contact.phoneNumber,
        incomingMsg.contact.name,
        Id());

    api.sendContact(incomingMsg.chat.id,
        incomingMsg.contact.phoneNumber,
        incomingMsg.contact.name,
        Id(), null, null,
        null, null, null);

    api.sendText(incomingMsg.chat.id,
        " Contact Name  is : " + incomingMsg.contact.name
        + " Phone number  is : "
        + incomingMsg.contact.phoneNumber);

}

let handleIncomingTextFileMsg = incomingMsg => {

    let textFileId = incomingMsg.textFile.id;
    console.log("================start of TextFile Object ===================");
    console.log("incomingMsg.text : " + incomingMsg.text);
    console.log("incomingMsg.textFile.id : " + textFileId);
    console.log("incomingMsg.textFile.size: "
        + incomingMsg.textFile.size);

    (new MediaTransfer()).downloadFile(TOKEN, textFileId, "./download", null);

    let uploadedTextFileId = (new MediaTransfer()).uploadFile(TOKEN, "./download/" + textFileId);

    api.sendDocument(incomingMsg.chat.id, uploadedTextFileId,
        Id(), null, null, null,
        null, "Text File Caption", null, null, null);

}

let handleIncomingLocationMsg = incomingMsg => {

    console.log("================start of Location Object ===================");
    console.log("incomingMsg.location.name : " + incomingMsg.location.name);
    console.log("incomingMsg.location.details : " + incomingMsg.location.details);
    console.log("incomingMsg.location.latitude : " + incomingMsg.location.latitude);
    console.log("incomingMsg.location.longitude : " + incomingMsg.location.longitude);

    let locationOutMsg = new LocationOutMessage();
    locationOutMsg.chatId = incomingMsg.chat.id;
    locationOutMsg.reference = Id();
    locationOutMsg.name = incomingMsg.location.name;
    locationOutMsg.details = incomingMsg.location.details;
    locationOutMsg.latitude = incomingMsg.location.latitude;
    locationOutMsg.longitude = incomingMsg.location.longitude;
    locationOutMsg.caption = "Location From Bot";

    api.send(locationOutMsg);

    // send location using sendlocation

    api.sendlocation(incomingMsg.chat.id,
        incomingMsg.location.latitude,
        incomingMsg.location.longitude);
    api.sendlocation(incomingMsg.chat.id,
        incomingMsg.location.latitude,
        incomingMsg.location.longitude,
        Id());
    api.sendlocation(incomingMsg.chat.id,
        incomingMsg.location.latitude,
        incomingMsg.location.longitude,
        Id(), null, null,
        null, null, null, null, null);

    api.sendText(incomingMsg.chat.id,
        " Latitude is : " + incomingMsg.location.latitude
        + " Longitude is : " + incomingMsg.location.longitude
        + " and name is :" + incomingMsg.location.name
        + " and details is :" + incomingMsg.location.details);

}

let handleIncomingGifMsg = incomingMsg => {

    console.log("================start of Gif Object ===================");
    console.log("incomingMsg.gif.id: " + incomingMsg.gif.id);
    console.log("incomingMsg.gif.width: " + incomingMsg.gif.width);
    console.log("incomingMsg.gif.height: " + incomingMsg.gif.height);
    console.log("incomingMsg.gif.size: " + incomingMsg.gif.size);
    console.log("================start of Gif Thumbinil  Object ===================");

    if (incomingMsg.gif.thumbnail && incomingMsg.gif.id.substr(incomingMsg.gif.id.lastIndexOf('.') + 1) == "gif") {

        console.log("================End of Gif Thumbinil Object ===================");
        console.log("incomingMsg.gif.thumbnail.id " + incomingMsg.gif.thumbnail.id);
        console.log("incomingMsg.gif.thumbnail.width: " + incomingMsg.gif.thumbnail.width);
        console.log("incomingMsg.gif.thumbnail.height: " + incomingMsg.gif.thumbnail.height);
        console.log("================End of Photo Object ===================");

        api.sendText(incomingMsg.chat.id,
            "Gif Size is : " + incomingMsg.gif.size
            + " and Gif width is :" + incomingMsg.gif.width
            + " and Gif height is :" + incomingMsg.gif.height
            + " and caption is : " + incomingMsg.caption
            + "\n\n Wait please sending you a Gif ....");

        let uploadedGifPhotoId = (new MediaTransfer()).uploadFile(TOKEN, "./upload/gif_sample.gif");

        if (uploadedGifPhotoId) {

            let gifMsg = new GifOutMessage("Photo")
            gifMsg.chatId = incomingMsg.chat.id;
            gifMsg.reference = Id();
            gifMsg.gif = uploadedGifPhotoId;
            gifMsg.caption = "Gif From Bot";
            gifMsg.echo = 0;

            api.send(gifMsg);

            // send GIF using sendGIF

            api.sendGIF(incomingMsg.chat.id,
                "92ff95add24e1c5f9294e5bea733f1629f7636fa081cb6e16d1ec256b792528c.gif",
                "without ref");
        }

    } else if (incomingMsg.gif.thumbnail &&
        incomingMsg.gif.id.substr(incomingMsg.gif.id.lastIndexOf('.' + 1)) == "mp4") {

        let uploadedGifVideoId = (new MediaTransfer()).uploadFile(TOKEN,
            "./upload/CeateGroup.mov");

        if (uploadedGifVideoId) {

            let gifMsg = new GifOutMessage("Video");
            gifMsg.chatId(incomingMsg.chat.id);
            gifMsg.reference = Id();
            gifMsg.gif = uploadedGifVideoId;
            gifMsg.caption = "Gif From Bot";
            gifMsg.echo = 0;

            api.send(gifMsg);

            // send GIF using sendGIF

            api.sendGIFVideo(incomingMsg.chat.id, uploadedGifVideoId,
                "without ref");
            api.sendGIFVideo(incomingMsg.chat.id, uploadedGifVideoId,
                Id(),
                "with ref");
            api.sendGIFVideo(incomingMsg.chat.id, uploadedGifVideoId,
                Id(),
                null, null, null, null, "with option", null);
        }
    } else
        console.log("================No Thumbinil Object in this Phot ===================");

}

let handleIncomingAudioMsg = incomingMsg => {

    console.log("================start of Voice Object ===================");
    console.log("incomingMsg.audio.id : " + incomingMsg.audio.id);
    console.log("incomingMsg.audio.duration : " + incomingMsg.audio.duration);
    console.log("incomingMsg.audio.title : " + incomingMsg.audio.title);
    console.log("incomingMsg.audio.size: " + incomingMsg.audio.size);
    console.log("incomingMsg.audio.performer : " + incomingMsg.audio.performer);
    console.log("================start of Photo Thumbinil  Object ===================");

    let audioOutMsg = new AudioOutMessage();
    audioOutMsg.chatId = incomingMsg.chat.id;
    audioOutMsg.reference = Id();
    audioOutMsg.audio = incomingMsg.audio.id;
    audioOutMsg.performer = "Perfomer Man";
    audioOutMsg.title = " Song";
    audioOutMsg.caption = "Audio From Bot";

    api.send(audioOutMsg);
    api.sendText(incomingMsg.chat.id, "Audio Title : "
        + incomingMsg.audio.title + " ,Audio Performer is : "
        + incomingMsg.audio.performer + ", Audio Size is : "
        + incomingMsg.audio.size + " and Audio Duration is :"
        + Utility.formatDurationInMinsAndSeconds(incomingMsg.audio.duration));

}

let handleIncomingVoiceMsg = incomingMsg => {

    console.log("================start of Voice Object ===================");
    console.log("incomingMsg.voice.id : " + incomingMsg.voice.id);
    console.log("incomingMsg.voice.duration: " + incomingMsg.voice.duration);
    console.log("incomingMsg.voice.size: " + incomingMsg.voice.size);
    console.log("================start of Photo Thumbinil  Object ===================");

    let voiceOutMsg = new VoiceOutMessage();
    voiceOutMsg.chatId = incomingMsg.chat.id;
    voiceOutMsg.reference = Id();
    voiceOutMsg.voice = incomingMsg.voice.id;
    voiceOutMsg.size = 700;
    voiceOutMsg.caption = "Vocie From Bot";

    api.send(voiceOutMsg);
    api.sendText(incomingMsg.chat.id, "Voice Size is : "
        + incomingMsg.voice.size + " and Voice Duration is :"
        + formatDurationInMinsAndSeconds(incomingMsg.voice.duration));

}

let handleIncomingVideoMsg = incomingMsg => {

    console.log("================start of Video Object ===================");
    console.log("incomingMsg.video.id : " + incomingMsg.video.id);
    console.log("incomingMsg.video.width : " + incomingMsg.video.width);
    console.log("incomingMsg.video.height : " + incomingMsg.video.height);
    console.log("incomingMsg.video.size : " + incomingMsg.video.size);
    console.log("incomingMsg.video.duration : " + incomingMsg.video.duration);
    console.log("================start of Video Thumbinil  Object ===================");

    if (incomingMsg.video.thumbnail) {
        console.log("================End of Photo Thumbinil Object ===================");
        console.log("incomingMsg.video.thumbnail.id " + incomingMsg.video.thumbnail.id);
        console.log("incomingMsg.video.thumbnail.width: " + incomingMsg.video.thumbnail.width);
        console.log("incomingMsg.video.thumbnail.height: " + incomingMsg.video.thumbnail.height);
        console.log("================End of Photo Object ===================");
    } else
        console.log("================No Thumbinil Object in this Phot ===================");


    let uploadedVideoId = (new MediaTransfer()).uploadFile(TOKEN, "./upload/recallTest.mp4");

    if (uploadedVideoId) {

        let vidoMsg = new VideoOutMessage();
        vidoMsg.chatId(incomingMsg.chat.id);
        vidoMsg.reference = Id();
        vidoMsg.video = uploadedVideoId;
        vidoMsg.caption = "Video From Bot";
        vidoMsg.echo = 0;

        api.send(vidoMsg);

    }

    api.sendText(incomingMsg.chat.id,
        "Video Size is : " + incomingMsg.video.size
        + " and Video width is :" + incomingMsg.video.width
        + " and Video height is :" + incomingMsg.video.height
        + " and Video duration is :"
        + formatDurationInMinsAndSeconds(incomingMsg.video.duration)
        + " and caption is : " + incomingMsg.caption);

}

let handleIncomingPhotoMsg = incomingMsg => {

    console.log("================start of Photo Object ===================");
    console.log("incomingMsg.photo.id: " + incomingMsg.photo.id);
    console.log("incomingMsg.photo.width: " + incomingMsg.photo.width);
    console.log("incomingMsg.photo.height: " + incomingMsg.photo.height);
    console.log("incomingMsg.photo.size: " + incomingMsg.photo.size);
    console.log("================start of Photo Thumbinil  Object ===================");
    if (incomingMsg.photo.thumbnail) {
        console.log("================End of Photo Thumbinil Object ===================");
        console.log("incomingMsg.photo.thumbnail.id " + incomingMsg.photo.thumbnail.id);
        console.log("incomingMsg.photo.thumbnail.width: " + incomingMsg.photo.thumbnail.width);
        console.log("incomingMsg.photo.thumbnail.height: " + incomingMsg.photo.thumbnail.height);
        console.log("================End of Photo Object ===================");
    } else
        console.log("================No Thumbinil Object in this Phot ===================");

    api.generatePermanentUrl(incomingMsg.photo.id, "Any Reference");

    (new MediaTransfer()).downloadFile(TOKEN, incomingMsg.photo.id, "./download", null);

    api.sendText(incomingMsg.chat.id,
        "Photo Size is : " + incomingMsg.photo.size
        + " and Photo width is :" + incomingMsg.photo.width
        + " and Photo height is :" + incomingMsg.photo.height
        + " and caption is : " + incomingMsg.caption
        + "\n\n Wait please sending you a photo ....");

    let uploadedPhotId = (new MediaTransfer()).uploadFile(TOKEN, "./upload/welcome.jpg");
    if (uploadedPhotId) {
        let photoMsg = new PhotoOutMessage();
        photoMsg.chatId = incomingMsg.chat.id;
        photoMsg.reference = Id();
        photoMsg.photo = uploadedPhotId;
        photoMsg.caption = "Photo From Bot";
        photoMsg.echo = 1;

        api.send(photoMsg);
    }
}

let createButton = (label, callback, order, bgColor, txtColor, buttonQuery, nextMenuRef) => {

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
