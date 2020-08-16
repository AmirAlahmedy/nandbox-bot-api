"use strict";
const Photo = require("./Photo");

module.exports = class User {


    constructor(jsonobj){

        if(!jsonobj)
            return;
        this.id =  jsonobj.id;
		this.name =  jsonobj.name;
		this.version =  jsonobj.version;
		this.terminal =  jsonobj.terminal;
		this.type =  jsonobj.type;		
		this.isBot =  jsonobj.is_bot;
		this.lastSeen =  jsonobj.last_seen;
		this.status =  jsonobj.status;
		this.profile =  jsonobj.profile;


		this.photo = jsonobj.photo != null ? new Photo(jsonobj.photo) : null;
    }

    toJsonObject(){
        let obj = {};

        if(this.id) obj.id = this.id;
        if(this.name) obj.name = this.name;
        if(this.version) obj.version = this.version;
        if(this.terminal) obj.terminal = this.terminal;
        if(this.type) obj.type = this.type;
        if(this.isBot) obj.is_bot = this.isBot;
        if(this.lastSeen) obj.last_seen = this.lastSeen;
        if(this.status) obj.status = this.status;
        if(this.profile) obj.profile = this.profile;
        if(this.photo) obj.photo = this.photo;

        return obj;
        
    }

}