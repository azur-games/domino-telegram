import {Button, LanguageText, Pivot, TonRates} from "@azur-games/pixi-vip-framework";
import {Point, Sprite} from "pixi.js";
import {DominoGame} from "../../../../../app";
import {WithdrawCurrencyCard} from "./main_withdraw_page/WithdrawCurrencyCard";
import {WithdrawCurrencyInput} from "./main_withdraw_page/WithdrawCurrencyInput";


export class MainWithdrawPage extends Sprite {
    private titleText: LanguageText;
    private subtitleText: LanguageText;
    private currencyCard: WithdrawCurrencyCard;
    private currencyInput: WithdrawCurrencyInput;
    private reviewWithdrawalButton: Button;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
        this.checkReviewWithdrawalButtonState();
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
        this.currencyInput = new WithdrawCurrencyInput(this.onCurrencyInputChange.bind(this));
        this.reviewWithdrawalButton = new Button({
            callback: this.onReviewWithdrawalButtonClick.bind(this),
            bgTextureName: "common/green_button",
            bgSizes: new Point(960, 94),
            bgCornersSize: 34,
            textKey: "Review withdrawal",
            fontSize: 40,
            fontWeight: "400",
            textPosition: new Point(0, -6),
        });
    }

    addChildren() {
        this.addChild(this.titleText);
        this.addChild(this.subtitleText);
        this.addChild(this.currencyCard);
        this.addChild(this.currencyInput);
        this.addChild(this.reviewWithdrawalButton);
    }

    initChildren() {
        Pivot.center(this.titleText);
        Pivot.center(this.subtitleText);

        this.titleText.y = -DominoGame.instance.screenH / 2 + 90;
        this.subtitleText.y = -DominoGame.instance.screenH / 2 + 200;

        this.currencyCard.y = -DominoGame.instance.screenH / 2 + 360;
        this.currencyInput.y = -DominoGame.instance.screenH / 2 + 600;
        this.reviewWithdrawalButton.y = -DominoGame.instance.screenH / 2 + 750;
    }

    onCurrencyInputChange(inputValue: number) {
        this.checkReviewWithdrawalButtonState();
    }

    applyData(rates: TonRates) {
        this.currencyInput.applyData(rates);
    }

    checkReviewWithdrawalButtonState() {
        const enabled = !!this.currencyInput.getValue();
        this.reviewWithdrawalButton.enabled = enabled;
        this.reviewWithdrawalButton.alpha = enabled ? 1 : .5;
    }

    onReviewWithdrawalButtonClick() {
        console.log("mnenmen");
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