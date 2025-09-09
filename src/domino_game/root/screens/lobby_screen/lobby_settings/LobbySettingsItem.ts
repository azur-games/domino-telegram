import {Button, DisplayObjectFactory, LanguageText, Pivot} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane, Sprite} from "pixi.js";


export class LobbySettingsItem extends Button {
    private background: NineSlicePlane;
    private rightIcon: Sprite;
    private titleText: LanguageText;
    private descriptionText: LanguageText;
    private leftIcon: Sprite;

    constructor(callback: Function, private titleKey: string, private descriptionKey: string, private iconTextureName: string) {
        super({callback});
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/settings_item_bg", 30, 30, 30, 30);
        this.rightIcon = DisplayObjectFactory.createSprite("lobby/right_icon");
        this.titleText = new LanguageText({key: this.titleKey, fontSize: 40, fill: 0xF1F3FF});
        this.descriptionText = new LanguageText({key: this.descriptionKey, fontSize: 26, fontWeight: "400", fill: 0x6C8DDF});
        this.leftIcon = DisplayObjectFactory.createSprite(this.iconTextureName);
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.rightIcon);
        this.addChild(this.titleText);
        this.addChild(this.descriptionText);
        this.addChild(this.leftIcon);
    }

    initChildren(): void {
        this.background.width = 960;
        this.background.height = 140;

        Pivot.center(this.background);
        Pivot.center(this.rightIcon);
        Pivot.center(this.leftIcon);

        this.rightIcon.x = 440;
        this.titleText.y = -45;
        this.titleText.x = -345;
        this.descriptionText.y = 13;
        this.descriptionText.x = -345;
        this.leftIcon.x = -410;
    }

    destroy(): void {
        this.removeChild(this.background);
        this.removeChild(this.rightIcon);
        this.removeChild(this.titleText);
        this.removeChild(this.descriptionText);
        this.removeChild(this.leftIcon);

        this.background.destroy();
        this.rightIcon.destroy();
        this.titleText.destroy();
        this.descriptionText.destroy();
        this.leftIcon.destroy();

        this.background = null;
        this.rightIcon = null;
        this.titleText = null;
        this.descriptionText = null;
        this.leftIcon = null;
        super.destroy();
    }
}
