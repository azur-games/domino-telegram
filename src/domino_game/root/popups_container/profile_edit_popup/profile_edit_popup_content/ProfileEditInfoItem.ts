import {DisplayObjectFactory, LanguageText, Pivot} from "@azur-games/pixi-vip-framework";
import {Sprite} from "pixi.js";


export class ProfileEditInfoItem extends Sprite {
    icon: Sprite;
    text: LanguageText;

    constructor(private textKey: string) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.icon = DisplayObjectFactory.createSprite("profile/info_dot");
        this.text = new LanguageText({key: this.textKey, fontSize: 32, fontWeight: "400", fill: 0x536DAE});
    }

    addChildren(): void {
        this.addChild(this.icon);
        this.addChild(this.text);
    }

    initChildren(): void {
        Pivot.center(this.text, false);
        this.text.x = -440;
        this.icon.x = -470;

    }

    destroy(): void {
        this.removeChild(this.icon);
        this.removeChild(this.text);
        this.icon.destroy();
        this.text.destroy();
        this.icon = null;
        this.text = null;
        super.destroy();
    }
}
