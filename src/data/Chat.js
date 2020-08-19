"use strict";

module.exports = class Chat {

    constructor(obj) {

        if(!obj)
            return;
        this.id = obj.id;
        this.title = obj.title;
        this.name = obj.name;
        this.type = obj.type;
        this.version = obj.version;
        this.languageCode = obj.language_code;
        this.regions = obj.regions;
        this.description = obj.description;
        this.category = obj.category;
        this.memberCount = obj.member_count;
        this.inviteLink = obj.invite_link;
        this.tagsDefinition = obj.tagsDefinition;

    }

    toJsonObject(){
        let obj = {};

        if (this.id) obj.id = this.id;
        if (this.title) obj.title = this.title;
        if (this.name) obj.name = this.name;
        if (this.type) obj.type = this.type;
        if (this.version) obj.version = this.version;
        if (this.languageCode) obj.language_code = this.languageCode;
        if (this.regions) obj.regions = this.regions;
        if (this.description) obj.description = this.description;
        if (this.category) obj.category = this.category;
        if (this.memberCount) obj.member_count = this.memberCount;
        if (this.inviteLink) obj.invite_link = this.inviteLink;
        if (this.photo) obj.KEY_PHOTO = this.photo;
        if (this.tagsDefinition) obj.tagsDefinition = this.tagsDefinition;

        return obj;
    }



}