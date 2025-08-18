import {LanguageText, Pivot, TonRates} from "@azur-games/pixi-vip-framework";
import {Sprite} from "pixi.js";
import {DominoGame} from "../../../../../app";
import {WithdrawCurrencyCard} from "./main_withdraw_page/WithdrawCurrencyCard";
import {WithdrawCurrencyInput} from "./main_withdraw_page/WithdrawCurrencyInput";


export class MainWithdrawPage extends Sprite {
    private titleText: LanguageText;
    private subtitleText: LanguageText;
    private currencyCard: WithdrawCurrencyCard;
    private currencyInput: WithdrawCurrencyInput;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren() {
        this.titleText = new LanguageText({
            key: "Withdraw",
            fontSize: 56,
            fontWeight: "500",
            fill: 0xF1F3FF
        });
        this.subtitleText = new LanguageText({
            key: "Please select withdrawal currency:",
            fontSize: 32,
            fontWeight: "400",
            fill: 0x7BA2FF
        });
        this.currencyCard = new WithdrawCurrencyCard();
        this.currencyInput = new WithdrawCurrencyInput();
    }

    addChildren() {
        this.addChild(this.titleText);
        this.addChild(this.subtitleText);
        this.addChild(this.currencyCard);
        this.addChild(this.currencyInput);
    }

    initChildren() {
        Pivot.center(this.titleText);
        Pivot.center(this.subtitleText);

        this.titleText.y = -DominoGame.instance.screenH / 2 + 90;
        this.subtitleText.y = -DominoGame.instance.screenH / 2 + 200;

        this.currencyCard.y = -DominoGame.instance.screenH / 2 + 360;
        this.currencyInput.y = -DominoGame.instance.screenH / 2 + 600;
    }

    applyData(rates: TonRates) {
        this.currencyInput.applyData(rates);
    }

    destroy() {
        this.removeChild(this.titleText);
        this.removeChild(this.subtitleText);
        this.removeChild(this.currencyCard);
        this.removeChild(this.currencyInput);

        this.titleText.destroy();
        this.subtitleText.destroy();
        this.currencyCard.destroy();
        this.currencyInput.destroy();

        this.titleText = null;
        this.subtitleText = null;
        this.currencyCard = null;
        this.currencyInput = null;

        super.destroy();
    }
}