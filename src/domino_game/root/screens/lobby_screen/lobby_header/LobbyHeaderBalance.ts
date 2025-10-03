import {Sprite} from "pixi.js";
import {DisplayObjectFactory, LanguageText, LoaderService, NumberUtils, Pivot} from "@azur-games/pixi-vip-framework";
import {GameEvents} from "../../../../../GameEvents";
import {CurrencyService} from "../../../../../services/CurrencyService";


export class LobbyHeaderBalance extends Sprite {
    private currencyIcon: Sprite;
    private balanceText: LanguageText;
    private onCurrencyChangeBindThis: () => void;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
        this.onCurrencyChangeBindThis = this.onCurrencyChange.bind(this);
        addEventListener(GameEvents.CURRENCY_CHANGED, this.onCurrencyChangeBindThis);
    }

    createChildren(): void {
        this.currencyIcon = DisplayObjectFactory.createSprite(CurrencyService.currencyIcon);
        this.balanceText = new LanguageText({
            key: "345",
            fontSize: 96,
            fontWeight: "700",
        });
    }

    addChildren(): void {
        this.addChild(this.balanceText);
        this.addChild(this.currencyIcon);
    }

    initChildren(): void {
        this.currencyIcon.scale.set(.7);
        Pivot.center(this.currencyIcon);

        this.balanceText.x = 75;
        this.balanceText.y = -30;
        this.currencyIcon.x = 27;
        this.currencyIcon.y = 33;
    }

    setBalance(coins: string) {
        this.balanceText.text = coins;
    }

    onCurrencyChange(): void {
        this.currencyIcon.texture = LoaderService.getTexture(CurrencyService.currencyIcon);
        Pivot.center(this.currencyIcon);
    }

    destroy(): void {
        removeEventListener(GameEvents.CURRENCY_CHANGED, this.onCurrencyChangeBindThis);
        this.onCurrencyChangeBindThis = null;
        this.removeChild(this.balanceText);
        this.balanceText.destroy();
        this.balanceText = null;
        super.destroy();
    }

}
