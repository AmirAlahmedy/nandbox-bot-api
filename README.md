# Node.js Nandbox Bot API
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/AmirAlahmedy/nandboxbotsapi/blob/master/LICENSE)

Node.js library to interact with official Nandbox Bot API. A bot token is **required** and can be obtained [this way](https://www.youtube.com/watch?v=FXb6tjOuxSc).

## Install
After you download the library, just run the following commands in your CLI.
```bash
npm install
```
```bash
npm run nand
```

## Build your first bot
You can easily build your bot by following the below steps:

**1.Setup your configuration file** once you get your bot configuration data from nandbox app , copy it to `config.json`

If you don't know how to get bot configuration data and token from nandbox 

- Open your bot in nandbox app then open  top right menu and click to `Get token` .This process explained in this [video](https://www.youtube.com/watch?v=FXb6tjOuxSc&feature=youtu.be).


You will get data like this:
``` 
token:90091783784280234234WBBPmJAnSD5ILIkc6N6QjY3ZzeY
url:wss://<SERVER>:<PORT>/nandbox/api/  
download:https://<SERVER>:<PORT>/nandbox/download/  
upload:https://<SERVER>:<PORT>/nandbox/upload/
```
save your token you will use it later and add other data to  `config.json` in the following format :
```json
{
    "URI": "wss://<SERVER>:<PORT>/nandbox/api/",
    "DownloadServer": "https://<SERVER>:<PORT>/nandbox/download/",  
    "UploadServer": "https://<SERVER>:<PORT>/nandbox/upload/"
}
```

**2.Implement your Main.js file :** To do that please follow the next instructions:
1- Replace `TOKEN` with your own bot token.
2- Implement the `nCallBack.onConnect` function.
3- Implement the rest of the functions as your application requires.

You will find the below code snippet already written in the `main.js`, implement the necessary functions.
```js
"use strict";
import NandBox from "./src/NandBox";
import { NandBoxClient } from "./src/NandBoxClient";


const TOKEN = "90091783927225986:0:PjAudagHdpEDxpIJOGKdNB1X6Og4WA";


var client = NandBoxClient.get();



var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to the server successfuly 
    api = _api;
    console.log("Authenticated");
}



nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");

    if (incomingMsg.isTextMsg()) {
        let chatId = incomingMsg.chat.id; // get your chat Id
        let text = incomingMsg.text; // get your text message
        api.sendText(chatId, text); // Sending message back as an Echo
    }

}

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => console.log("received object: ", obj);

nCallBack.onClose = () => console.log("ONCLOSE");
nCallBack.onError = () => console.log("ONERROR");
nCallBack.onChatMenuCallBack = chatMenuCallback => { }
nCallBack.onInlineMessageCallback = inlineMsgCallback => { }
nCallBack.onMessagAckCallback = msgAck => { }
nCallBack.onUserJoinedBot = user => { }
nCallBack.onChatMember = chatMember => { }
nCallBack.onChatAdministrators = chatAdministrators => { }
nCallBack.userStartedBot = user => { }
nCallBack.onMyProfile = user => { }
nCallBack.onUserDetails = user => { }
nCallBack.userStoppedBot = user => { }
nCallBack.userLeftBot = user => { }
nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { }
nCallBack.onInlineSearh = inlineSearch => { }

client.connect(TOKEN, nCallBack);
```
--
## License 
MIT License

Copyright (c) 2019 nandbox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.