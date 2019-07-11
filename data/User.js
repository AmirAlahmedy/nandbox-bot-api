"use strict";
import Photo from "./Photo";

export default class User {

    static KEY_ID = "id";
    static KEY_NAME =  "name";
    static KEY_TERMINAL =  "terminal";
    static KEY_TYPE = "type";
    static KEY_IS_BOT = "is_bot";
    static KEY_VERSION = "version";
    static KEY_LAST_SEEN = "last_seen";
    static KEY_STATUS =  "status";
    static KEY_PHOTO = "photo";
    static KEY_PROFILE = "profile";

    id;
	name;
	version;
	terminal;
	type;
	isBot;
	lastSeen;
	status;
	profile;
    photo;

    constructor(jsonobj){

        this.id =  jsonobj.KEY_ID;
		this.name =  jsonobj.KEY_NAME;
		this.version =  jsonobj.KEY_VERSION;
		this.terminal =  jsonobj.KEY_TERMINAL;
		this.type =  jsonobj.KEY_TYPE;		
		this.isBot =  jsonobj.KEY_IS_BOT;
		this.lastSeen =  jsonobj.KEY_LAST_SEEN;
		this.status =  jsonobj.KEY_STATUS;
		this.profile =  jsonobj.KEY_PROFILE;


		this.photo = jsonobj.KEY_PHOTO != null ? new Photo(jsonobj.KEY_PHOTO) : null;
    }

    toJsonObject = () => {
        let obj = {};

        if(this.id) obj.KEY_ID = this.id;
        if(this.name) obj.KEY_NAME = this.name;
        if(this.version) obj.KEY_VERSION = this.version;
        if(this.terminal) obj.KEY_TERMINAL = this.terminal;
        if(this.type) obj.KEY_TYPE = this.type;
        if(this.isBot) obj.KEY_IS_BOT = this.isBot;
        if(this.lastSeen) obj.KEY_LAST_SEEN = this.lastSeen;
        if(this.status) obj.KEY_STATUS = this.status;
        if(this.profile) obj.KEY_PROFILE = this.profile;
        if(this.photo) obj.KEY_PHOTO = this.photo;

        return obj;
        
    }

/*  getId = () => this.id;
    setId = id => {this.id = id;}
    getName = () => this.name;
    setName = name => {this.name = name}
    getVersion = () => this.version;
    setVersion = version => {this.version = version;}
    getLastSeen = () => this.lastSeen;
    setLastSeen = lastSeen => {this.lastSeen = lastSeen;}
    getStatus = () => this.status;
    setStatus = status => {this.status = status;}
    getIsBot = () => this.isBot;
    setIsBot = isBot => {this.isBot = isBot}
    getPhoto = () => this.getPhoto;
    setPhoto = photo => {this.photo = photo}
    getTerminal = () => this.terminal;
    setTerminal = terminal => {this.terminal = terminal}
    getProfile = () => this.profile;
    setProfile = profile => {this.profile;}
    getType = () => this.type;
    setType = type => {this.type = type;} */

}