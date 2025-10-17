import {Sprite} from "pixi.js";
import {DisplayObjectFactory, LanguageText, Pivot} from "@azur-games/pixi-vip-framework";
import {CurrencyConverter} from "../../utils/CurrencyConverter";


export class DepositSuccessContent extends Sprite {
    private successIcon: Sprite;
    private receivedText: LanguageText;
    private valueText: LanguageText;
    private centerContainer: Sprite;

    constructor(private nanotons: string) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.successIcon = DisplayObjectFactory.createSprite("common/check_icon");
        this.centerContainer = DisplayObjectFactory.createSprite();
        this.receivedText = new LanguageText({key: "You have received a ", fontSize: 44, fill: 0x83A1F8});
        this.valueText = new LanguageText({key: CurrencyConverter.nanotonToUSD(parseInt(this.nanotons)) + "$", fontSize: 44});
    }

    addChildren(): void {
        this.addChild(this.successIcon);
        this.addChild(this.centerContainer);
        this.centerContainer.addChild(this.receivedText);
        this.centerContainer.addChild(this.valueText);
    }

    initChildren(): void {
        this.successIcon.scale.set(1.2);
        Pivot.center(this.successIcon);
        Pivot.center(this.receivedText, false);
        Pivot.center(this.valueText, false);
        Pivot.center(this.centerContainer);
        this.valueText.x = this.receivedText.width;

        this.successIcon.y = -34;
        this.centerContainer.y = 40;
        this.centerContainer.x = -(this.receivedText.width + this.valueText.width) / 2;
    }

    destroy(): void {
        this.removeChild(this.successIcon);
        this.removeChild(this.receivedText);
        this.removeChild(this.valueText);
        this.removeChild(this.centerContainer);

        this.successIcon.destroy();
        this.receivedText.destroy();
        this.valueText.destroy();
        this.centerContainer.destroy();

        this.successIcon = null;
        this.receivedText = null;
        this.valueText = null;
        this.centerContainer = null;

        super.destroy();
    }
}
