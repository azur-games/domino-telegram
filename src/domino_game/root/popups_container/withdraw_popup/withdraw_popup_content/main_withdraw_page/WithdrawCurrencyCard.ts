import {Sprite, NineSlicePlane} from "pixi.js";
import {DisplayObjectFactory, LanguageText, Button, Pivot} from "@azur-games/pixi-vip-framework";


export class WithdrawCurrencyCard extends Button {
    private background: NineSlicePlane;
    private currencyIcon: Sprite;
    private currencyNameText: LanguageText;
    private selectedIcon: Sprite;

    constructor() {
        super({});
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    processClick() {
        console.log("TON currency selected for withdrawal");
    }

    createChildren() {
        this.background = DisplayObjectFactory.createNineSlicePlane("withdraw/currency_selection_bg", 40, 40, 40, 45);
        this.currencyIcon = DisplayObjectFactory.createSprite("withdraw/ton_symbol_shadow");
        this.currencyNameText = new LanguageText({
            key: "TON",
            fontSize: 32,
            fontWeight: "500",
            fill: 0xFFFFFF
        });
        this.selectedIcon = DisplayObjectFactory.createSprite("withdraw/selected_currency_icon");
    }

    addChildren() {
        this.addChild(this.background);
        this.addChild(this.currencyIcon);
        this.addChild(this.currencyNameText);
        this.addChild(this.selectedIcon);
    }

    initChildren() {
        this.background.width = 451;
        this.background.height = 190;

        Pivot.center(this.background);
        Pivot.center(this.currencyIcon);
        Pivot.center(this.currencyNameText);
        Pivot.center(this.selectedIcon);

        this.currencyIcon.y = -25;
        this.currencyNameText.y = 45;
        this.selectedIcon.y = 42;
        this.selectedIcon.x = 178;
    }

    destroy() {
        this.removeChild(this.background);
        this.removeChild(this.currencyIcon);
        this.removeChild(this.currencyNameText);
        this.removeChild(this.selectedIcon);

        this.background.destroy();
        this.currencyIcon.destroy();
        this.currencyNameText.destroy();
        this.selectedIcon.destroy();

        this.background = null;
        this.currencyIcon = null;
        this.currencyNameText = null;
        this.selectedIcon = null;

        super.destroy();
    }
}