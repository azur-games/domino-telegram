import {Sprite, NineSlicePlane} from "pixi.js";
import {DisplayObjectFactory, LanguageText, Pivot} from "@azur-games/pixi-vip-framework";


export class WarningBlock extends Sprite {
    private background: NineSlicePlane;
    private warningIcon: Sprite;
    private warningText: LanguageText;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren() {
        this.background = DisplayObjectFactory.createNineSlicePlane("deposit/red_bg", 20, 20, 20, 20);
        this.warningIcon = DisplayObjectFactory.createSprite("deposit/attention_sign"); // Will be styled as warning icon
        this.warningText = new LanguageText({
            key: "Deposit.Attention2",
            fontSize: 26,
            fill: 0xF1F3FF,
            fontWeight: "400"
        });
    }

    addChildren() {
        this.addChild(this.background);
        this.addChild(this.warningIcon);
        this.addChild(this.warningText);
    }

    initChildren() {
        this.background.width = 960;
        this.background.height = 133;
        Pivot.center(this.background);
        Pivot.center(this.warningIcon);
        Pivot.center(this.warningText,);

        this.warningIcon.x = -260;
        this.warningIcon.y = 5;

        this.warningText.style.wordWrap = true;
        this.warningText.style.wordWrapWidth = 700;
    }

    destroy() {
        this.removeChild(this.background);
        this.removeChild(this.warningIcon);
        this.removeChild(this.warningText);

        this.background.destroy();
        this.warningIcon.destroy();
        this.warningText.destroy();

        this.background = null;
        this.warningIcon = null;
        this.warningText = null;

        super.destroy();
    }
}