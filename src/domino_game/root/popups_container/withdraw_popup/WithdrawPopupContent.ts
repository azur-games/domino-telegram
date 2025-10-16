import {Button, DisplayObjectFactory, Pivot, PreloaderService, StageResizeListening, TonRates} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane, Point} from "pixi.js";
import {DominoGame} from "../../../../app";
import {DynamicData} from "../../../../DynamicData";
import {WithdrawInputAddressChange, WithdrawInputAddressChangePayload} from "../../../../game_events/WithdrawInputAddressChange";
import {WithdrawInputAmountChange, WithdrawInputAmountChangePayload} from "../../../../game_events/WithdrawInputAmountChange";
import {GameEvents} from "../../../../GameEvents";
import {NotificationService} from "../../../../services/NotificationService";
import {SocketService} from "../../../../services/SocketService";
import {AddressWithdrawalPage} from "./withdraw_popup_content/AddressWithdrawalPage";
import {MainWithdrawPage} from "./withdraw_popup_content/MainWithdrawPage";


export class WithdrawPopupContent extends StageResizeListening {
    private background: NineSlicePlane;
    private backButton: Button;
    private mainPage: MainWithdrawPage;
    private addressPage: AddressWithdrawalPage;
    private reviewWithdrawalButton: Button;
    private rates: TonRates;
    private inputAmountInCoins: string = "";
    private addressValue: string = "";
    private currentStage: "main" | "address" = "main";
    private onWithdrawInputAmountChangeBindThis: (e: WithdrawInputAmountChange) => void;
    private onWithdrawInputAddressChangeBindThis: (e: WithdrawInputAddressChange) => void;

    constructor() {
        super();
        this.init();

    }

    async init() {
        let id = PreloaderService.show();
        // this.rates = {"ton2usdt": 3.45181717, "inUsdtToCoin": 75, "outUsdtToCoin": 100, "minTransactionUsd": 1, "addr": "EQAjSUug6JFtle0q14wO_oWT6xCLd8VAwqyWeM98r4pkOiS6"} as TonRates;
        this.rates = await SocketService.tonRates();
        DynamicData.tonRates = this.rates;
        PreloaderService.hide(id);
        this.createChildren();
        this.addChildren();
        this.onGameScaleChanged();
        this.mainPage.applyData(this.rates);
        this.changeStage();
        this.onWithdrawInputAmountChangeBindThis = this.onWithdrawInputAmountChange.bind(this);
        addEventListener(GameEvents.WITHDRAW_INPUT_AMOUNT_CHANGE, this.onWithdrawInputAmountChangeBindThis);
        this.onWithdrawInputAddressChangeBindThis = this.onWithdrawInputAddressChange.bind(this);
        addEventListener(GameEvents.WITHDRAW_INPUT_ADDRESS_CHANGE, this.onWithdrawInputAddressChangeBindThis);
    }

    createChildren() {
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/lobby_bg", 1, 1, 1, 1);
        this.backButton = new Button({
            callback: this.onBackButtonClick.bind(this),
            iconTextureName: "deposit/right_arrow_icon"
        });
        this.mainPage = new MainWithdrawPage();
        this.addressPage = new AddressWithdrawalPage();
        this.reviewWithdrawalButton = new Button({
            callback: this.onReviewWithdrawalButtonClick.bind(this),
            bgTextureName: "common/green_button",
            bgSizes: new Point(960, 94),
            bgCornersSize: 34,
            textKey: "Withdraw.ButtonTitle",
            fontSize: 40,
            fontWeight: "400",
            textPosition: new Point(0, -6),
        });
    }

    addChildren() {
        this.addChild(this.background);
        this.addChild(this.backButton);
        this.addChild(this.mainPage);
        this.addChild(this.addressPage);
        this.addChild(this.reviewWithdrawalButton);
    }

    onBackButtonClick() {
        dispatchEvent(new MessageEvent(GameEvents.CLOSE_WITHDRAW_POPUP));
    }

    onGameScaleChanged() {
        this.background.width = DominoGame.instance.screenW;
        this.background.height = DominoGame.instance.screenH;

        this.backButton.icon.rotation = Math.PI;

        Pivot.center(this.backButton.icon);
        Pivot.center(this.background);

        this.backButton.x = -DominoGame.instance.screenW / 2 + 96;
        this.backButton.y = -DominoGame.instance.screenH / 2 + 96;
        this.mainPage.y = -DominoGame.instance.screenH / 2 + 970;
        this.addressPage.y = -DominoGame.instance.screenH / 2 + 970;
        this.reviewWithdrawalButton.y = -DominoGame.instance.screenH / 2 + (this.currentStage == "main" ? 760 : 430);
    }

    onWithdrawInputAmountChange(e: WithdrawInputAmountChange) {
        const {amount}: WithdrawInputAmountChangePayload = e.detail;
        this.inputAmountInCoins = amount;
        this.checkReviewWithdrawalButtonState();
    }

    onWithdrawInputAddressChange(e: WithdrawInputAddressChange) {
        const {address}: WithdrawInputAddressChangePayload = e.detail;
        this.addressValue = address;
        this.checkReviewWithdrawalButtonState();
    }

    checkReviewWithdrawalButtonState() {
        const enabled = this.currentStage == "main" ? !!this.inputAmountInCoins : !!this.addressValue;
        this.reviewWithdrawalButton.enabled = enabled;
        this.reviewWithdrawalButton.alpha = enabled ? 1 : .5;
    }

    reset() {
        this.inputAmountInCoins = null;
        this.addressValue = null;
        this.checkReviewWithdrawalButtonState();
    }

    async onReviewWithdrawalButtonClick() {
        if (this.currentStage == "main") {
            this.currentStage = "address";
            this.changeStage();
        } else {
            await SocketService.tonPayout(parseInt(this.inputAmountInCoins), this.addressValue);
            this.reset();
            NotificationService.showWithdrawSubmitted();
        }
    }

    changeStage() {
        this.addressPage.visible = this.currentStage == "address";
        this.mainPage.visible = this.currentStage == "main";
        this.onGameScaleChanged();
        this.checkReviewWithdrawalButtonState();
    }

    destroy() {
        removeEventListener(GameEvents.WITHDRAW_INPUT_AMOUNT_CHANGE, this.onWithdrawInputAmountChangeBindThis);
        removeEventListener(GameEvents.WITHDRAW_INPUT_ADDRESS_CHANGE, this.onWithdrawInputAddressChangeBindThis);
        this.onWithdrawInputAmountChangeBindThis = null;
        this.onWithdrawInputAddressChangeBindThis = null;

        this.removeChild(this.background);
        this.removeChild(this.backButton);
        this.removeChild(this.mainPage);
        this.removeChild(this.addressPage);
        this.removeChild(this.reviewWithdrawalButton);

        this.background.destroy();
        this.backButton.destroy();
        this.mainPage.destroy();
        this.addressPage.destroy();
        this.reviewWithdrawalButton.destroy();

        this.background = null;
        this.backButton = null;
        this.mainPage = null;
        this.addressPage = null;
        this.reviewWithdrawalButton = null;
        this.rates = null;

        super.destroy();
    }
}