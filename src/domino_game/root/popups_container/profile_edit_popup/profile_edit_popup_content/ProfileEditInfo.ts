import {LanguageService} from "@azur-games/pixi-vip-framework";
import {Sprite} from "pixi.js";
import {ProfileEditInfoItem} from "./ProfileEditInfoItem";


export class ProfileEditInfo extends Sprite {
    private items: ProfileEditInfoItem[];

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.items = [
            LanguageService.getTextByKey("EditProfile.Requirements1"),
            LanguageService.getTextByKey("EditProfile.Requirements2"),
            LanguageService.getTextByKey("EditProfile.Requirements3")
        ].map((text) => new ProfileEditInfoItem(text));

    }

    addChildren(): void {
        this.items.forEach(item => this.addChild(item));
    }

    initChildren(): void {
        this.items.forEach((item, i) => {
            item.y = i * 60;
        });
    }

    destroy(): void {
        let item: ProfileEditInfoItem;
        while (this.items.length) {
            item = this.items.shift();
            item.destroy();
            item = null;
        }
        super.destroy();
    }
}
