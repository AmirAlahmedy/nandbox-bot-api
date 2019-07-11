"strict mode";
import { NandBox, callback, api } from "./NandBox";
import User from "./ChatClasses/User";

class NandBoxClient {

/*     getUri = () => this.uri;
    setUri = uri => { this.uri = uri; }
    getBotId = () => this.BOT_ID; */

    static CONFIG_FILE = "./Public/config.json";
    static BOT_ID = null;
    static nandboxClient;
    webSocketClient;
    closingCounter = 0;
    timeOutCounter = 0;
    connRefusedCounter = 0;
    uri;
    KEY_METHOD = "method";
    KEY_ERROR = "error";


    getConfigs = () => {
        try {
            let configs = require(this.CONFIG_FILE);
        } catch (error) {
            // TODO: handle config error
        }

        return configs;
    }

    maxTextMessageSize = 1e5;
    InternalWebSocket = class {

        NO_OF_RETRIES_IF_CONN_TO_SERVER_REFUSED = 20;
        NO_OF_RETRIES_IF_CONN_TIMEDOUT = 10;
        NO_OF_RETRIES_IF_CONN_CLOSED = 10;
        KEY_USER = "user";
        KEY_CHAT = "chat";
        KEY_NAME = "name";
        KEY_ID = "ID";

        callback;
        session;
        token;
        api;
        authenticated = false;
        echo = false;
        lastMessage = 0;
        connection = null;

        constructor() {
            this.connect();
        }
        PingThread = class {
            interrupted = false;
            interrupt = () => {
                this.interrupted = true;

            }
        }

        uri = this.getConfigs.URI;

        connect = () => {
            this.connection = new WebSocket(uri);
            this.connection.onclose(this.connect);
            this.pingpong();
            this.connection.onopen = () => { console.log("connection opened"); }
            this.connection.onerror = error => { }
            this.connection.onmessage = msg => {

                let user;
                let lastMessage = (new Date()).getUTCMilliseconds();
                console.log("INTERNAL: ONMESSAGE");
                let obj = JSON.parse(msg);
                console.log(formatDate(new Date()) + " >>>>>>>>> Update Obj : " + obj);


            }

        }

        pingpong = () => {
            if (!this.connection) return;
            if (this.connection.readyState !== 1) return;
            this.connection.send("ping");
            setTimeout(this.pingpong, 30000);
        }

        pingThread = null;
        InternalWebSocket = (token, callback) => {
            this.token = token;
            this.callback = callback;
        }

        onClose = (statusCode, reason) => {
            console.log("INTERNAL: ONCLOSE");
            console.log("StatusCode = " + statusCode);
            console.log("Reason : " + reason);

            let current_datetime = new Date();
            let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            console.log(formatted_date);

            authenticated = false;
            // TODO: implement an alternative to threading
            //    if(this.pingThread !== null){
            //        try{

            //        }catch(e){
            //            console.log(e);
            //        }
            //    }

            pingThread = null;
            callback.onClose();

            // TODO: implement commented functions
            if ((statusCode == 1000 || statusCode == 1006 || statusCode == 1001 || statusCode == 1005)
                && closingCounter < NO_OF_RETRIES_IF_CONN_CLOSED) {
                try {

                    console.log("Please wait 10 seconds for Reconnecting ");
                    // TimeUnit.SECONDS.sleep(10);

                    closingCounter = closingCounter + 1;
                    console.log("Conenction Closing counter is  : " + closingCounter);
                } catch (e1) {
                    e1.printStackTrace();
                    //  Thread.currentThread().interrupt();
                }
                stopWebSocketClient();
                try {
                    reconnectWebSocketClient();
                } catch (e) {
                    e.printStackTrace();
                    //   Thread.currentThread().interrupt();
                }

            } else {
                console.log("End nandbox client");
                // System.exit(0)

            }

        }

        reconnectWebSocketClient = () => {
            console.log("Creating new webSocketClient");
            //webSocketClient = new WebSocketClient(new SslContextFactory());
            //webSocketClient.start();
            console.log("webSocketClient started");
            console.log("Getting NandboxClient Instance");
            nandboxClient = NandboxClient.get();
            console.log("Calling NandboxClient connect");
            nandboxClient.connect(token, callback);
        }

    }
    init = () => {
        if (nandboxClient != null) return;
        this.nandboxClient = new NandboxClient();
    }

    get = () => {
        if (this.nandboxClient == null)
            this.init();
        return this.nandboxClient;
    }

    connect = (token, callback) => {
        internalWebSocket = new this.InternalWebSocket(token, callback);
        // TODO: create connection of the internal websocket
    }


}


