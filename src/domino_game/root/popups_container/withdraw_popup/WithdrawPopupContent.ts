import {Button, DisplayObjectFactory, Pivot, PreloaderService, StageResizeListening, TonRates} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane} from "pixi.js";
import {DominoGame} from "../../../../app";
import {DynamicData} from "../../../../DynamicData";
import {GameEvents} from "../../../../GameEvents";
import {MainWithdrawPage} from "./withdraw_popup_content/MainWithdrawPage";


export class WithdrawPopupContent extends StageResizeListening {
    private background: NineSlicePlane;
    private backButton: Button;
    private mainWithdrawPage: MainWithdrawPage;
    private rates: TonRates;

    constructor() {
        super();
        this.init();
    }

    async init() {
        let id = PreloaderService.show();
        this.rates = {"ton2usdt": 3.45181717, "inUsdtToCoin": 75, "outUsdtToCoin": 100, "minTransactionUsd": 1, "addr": "EQAjSUug6JFtle0q14wO_oWT6xCLd8VAwqyWeM98r4pkOiS6"} as TonRates;
        // this.rates = await SocketService.tonRates();
        DynamicData.tonRates = this.rates;
        PreloaderService.hide(id);
        this.createChildren();
        this.addChildren();
        this.onGameScaleChanged();
        this.mainWithdrawPage.applyData(this.rates);
    }

    createChildren() {
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/lobby_bg", 1, 1, 1, 1);
        this.backButton = new Button({
            callback: this.onBackButtonClick.bind(this),
            iconTextureName: "deposit/right_arrow_icon"
        });
        this.mainWithdrawPage = new MainWithdrawPage();
    }

    addChildren() {
        this.addChild(this.background);
        this.addChild(this.backButton);
        this.addChild(this.mainWithdrawPage);
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
    }

    destroy() {
        this.removeChild(this.background);
        this.removeChild(this.backButton);
        this.removeChild(this.mainWithdrawPage);

        this.background.destroy();
        this.backButton.destroy();
        this.mainWithdrawPage.destroy();

        this.background = null;
        this.backButton = null;
        this.mainWithdrawPage = null;

        super.destroy();
    }
}