"use strict";
import Photo from "./Photo";

export default class Chat {

    static KEY_ID = "id";
    static KEY_TITLE = "title";
    static KEY_NAME = "name";
    static KEY_TYPE = "type";
    static KEY_VERSION = "version";
    static KEY_LANGUAGE_CODE = "language_code";
    static KEY_REGIONS = "regions";
    static KEY_DESCRIPTION = "description";
    static KEY_PHOTO = "photo";
    static KEY_CATEGORY = "category";
    static KEY_MEMBER_COUNT = "member_count";
    static KEY_INVITE_LINK = "invite_link";

    id;
    title;
    name;
    type;
    version;
    languageCode;
    regions;
    description;
    photo = new Photo();
    category;
    memberCount;
    inviteLink;

    constructor(obj) {

        if(!obj)
            return;
        this.id = obj.KEY_ID;
        this.title = obj.KEY_TITLE;
        this.name = obj.KEY_NAME;
        this.type = obj.KEY_TYPE;
        this.version = obj.KEY_VERSION;
        this.languageCode = obj.KEY_LANGUAGE_CODE;
        this.regions = obj.KEY_REGIONS;
        this.description = obj.KEY_DESCRIPTION;
        this.category = obj.KEY_CATEGORY;
        this.memberCount = obj.KEY_MEMBER_COUNT;
        this.inviteLink = obj.KEY_INVITE_LINK;

    }

    toJsonObject = () => {
        let obj = {};

        if (this.id) obj.KEY_ID = this.id;
        if (this.title) obj.KEY_TITLE = this.title;
        if (this.name) obj.KEY_NAME = this.name;
        if (this.type) obj.KEY_TYPE = this.type;
        if (this.version) obj.KEY_VERSION = this.version;
        if (this.languageCode) obj.KEY_LANGUAGE_CODE = this.languageCode;
        if (this.regions) obj.KEY_REGIONS = this.regions;
        if (this.description) obj.KEY_DESCRIPTION = this.description;
        if (this.category) obj.KEY_CATEGORY = this.category;
        if (this.memberCount) obj.KEY_MEMBER_COUNT = this.memberCount;
        if (this.inviteLink) obj.KEY_INVITE_LINK = this.inviteLink;
        if (this.photo) obj.KEY_PHOTO = this.photo;

        return obj;
    }



}