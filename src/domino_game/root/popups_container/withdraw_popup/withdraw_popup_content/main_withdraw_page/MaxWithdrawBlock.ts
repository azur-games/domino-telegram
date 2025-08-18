import {Button, NumberUtils} from "@azur-games/pixi-vip-framework";
import {Point} from "pixi.js";


export class MaxWithdrawBlock extends Button {

    constructor(callback: Function) {
        super({
            callback,
            bgTextureName: "withdraw/max_amount_bg",
            bgCornersSize: 33,
            bgSizes: new Point(208, 72),
            fontSize: 28,
            fontWeight: "400",
            textKey: "MAX:"
        });
    }

    updateMaxAmount(maxAmount: number) {
        this.languageText.changeText(`MAX: $${NumberUtils.shortPriceFormat(maxAmount, 2)}`);
    }
}