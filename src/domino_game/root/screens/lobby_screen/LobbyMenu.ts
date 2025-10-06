import {Sprite} from "pixi.js";
import {GameEvents} from "../../../../GameEvents";
import {Currency, CurrencyService} from "../../../../services/CurrencyService";
import {MetricaEvents, MetricaService} from "../../../../services/MetricaService";
import {LobbyMenuItem} from "./lobby_menu/LobbyMenuItem";


export class LobbyMenu extends Sprite {
    private cashButton: LobbyMenuItem;
    private freeButton: LobbyMenuItem;
    private moreButton: LobbyMenuItem;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.cashButton = new LobbyMenuItem(this.onCashButtonClicked.bind(this), "lobby/menu_dollar_icon", "Cash");
        this.freeButton = new LobbyMenuItem(this.onFreeButtonClicked.bind(this), "lobby/menu_free_icon", "Free");
        this.moreButton = new LobbyMenuItem(this.onMoreButtonClicked.bind(this), "lobby/menu_more_icon", "More");
    }

    addChildren(): void {
        this.addChild(this.cashButton).fade(CurrencyService.isSoftModeNow);
        this.addChild(this.freeButton).fade(CurrencyService.isHardModeNow);
        this.addChild(this.moreButton).fade();
    }

    initChildren(): void {
        this.cashButton.x = -340;
        this.moreButton.x = 340;
    }

    onCashButtonClicked(): void {
        CurrencyService.currency = Currency.HARD;
        this.cashButton.fade(false);
        this.freeButton.fade();
    }

    onFreeButtonClicked(): void {
        CurrencyService.currency = Currency.SOFT;
        this.freeButton.fade(false);
        this.cashButton.fade();
    }

    onMoreButtonClicked(): void {
        MetricaService.sendEvent(MetricaEvents.OPEN_SETTINGS);
        dispatchEvent(new MessageEvent(GameEvents.SHOW_LOBBY_SETTINGS, {data: true}));
    }

    destroy(): void {

        this.removeChild(this.cashButton);
        this.removeChild(this.freeButton);
        this.removeChild(this.moreButton);
        this.cashButton.destroy();
        this.freeButton.destroy();
        this.moreButton.destroy();
        this.cashButton = null;
        this.freeButton = null;
        this.moreButton = null;
        super.destroy();
    }
}
