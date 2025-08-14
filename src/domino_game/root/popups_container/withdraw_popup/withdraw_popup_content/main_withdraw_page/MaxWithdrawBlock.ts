import {DisplayObjectFactory, LanguageText, NumberUtils, Pivot} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane, Sprite} from "pixi.js";


export class MaxWithdrawBlock extends Sprite {
    private background: NineSlicePlane;
    private maxText: LanguageText;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren() {
        this.background = DisplayObjectFactory.createNineSlicePlane("withdraw/max_amount_bg", 33, 33, 33, 33);
        this.maxText = new LanguageText({
            key: "",
            fontSize: 28,
            fontWeight: "400",
            fill: 0xFFFFFF
        });
    }

    addChildren() {
        this.addChild(this.background);
        this.addChild(this.maxText);
    }

    initChildren() {
        this.background.width = 208;
        this.background.height = 72;

        Pivot.center(this.background);
        Pivot.center(this.maxText);
    }

    updateMaxAmount(maxAmount: string) {
        console.log("LOG: updateMaxAmount", maxAmount);
        this.maxText.changeText(`MAX: $${NumberUtils.shortPriceFormat(parseInt(maxAmount), 2)}`);
    }

    destroy() {
        this.removeChild(this.background);
        this.removeChild(this.maxText);

        this.background.destroy();
        this.maxText.destroy();

        this.background = null;
        this.maxText = null;

        super.destroy();
    }
}