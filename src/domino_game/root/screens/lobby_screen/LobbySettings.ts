import {Button, DisplayObjectFactory, LanguageText, Pivot, PlatformService, TelegramApi} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane, Sprite} from "pixi.js";
import {DominoGame} from "../../../../app";
import {GameEvents} from "../../../../GameEvents";
import {LobbySettingsItem} from "./lobby_settings/LobbySettingsItem";


export class LobbySettings extends Sprite {
    private background: NineSlicePlane;
    private title: LanguageText;
    private closeButton: Button;
    private infoItems: LobbySettingsItem[];
    private walletTitle: LanguageText;
    private walletItem: LobbySettingsItem;
    private infoConfigs: any[] = [
        {
            callback: this.onNewsClick.bind(this),
            titleKey: "Domino King News",
            descriptionKey: "t.me/DominoKingRoom",
            iconTextureName: "lobby/tg_icon"
        },
        {
            callback: this.onChatClick.bind(this),
            titleKey: "Chat with us",
            descriptionKey: "Support, Partnership, etc",
            iconTextureName: "lobby/chat_icon"
        },
        {
            callback: this.onAgreementClick.bind(this),
            titleKey: "User agreement",
            descriptionKey: "Last updated: 2023-10-16",
            iconTextureName: "lobby/agreement_icon"
        },
    ];

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/settings_bg", 2, 2, 2, 2);
        this.title = new LanguageText({
            key: "More",
            fontSize: 56,
            fontWeight: "500",
        });
        this.closeButton = new Button({
            callback: this.onCloseButtonClick.bind(this),
            bgTextureName: "lobby/close_icon"
        });
        this.infoItems = this.infoConfigs.map(
            ({callback, titleKey, descriptionKey, iconTextureName}) => new LobbySettingsItem(callback, titleKey, descriptionKey, iconTextureName)
        );

        this.walletTitle = new LanguageText({key: "Withdraw wallets", fontSize: 56, fontWeight: "500"});
        this.walletItem = new LobbySettingsItem(this.onWalletClick.bind(this), "USDT", "TON", "deposit/ton_symbol");
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.title);
        this.addChild(this.closeButton);
        this.infoItems.forEach(item => this.addChild(item));
        this.addChild(this.walletTitle);
        this.addChild(this.walletItem);
    }

    initChildren(): void {
        this.background.width = DominoGame.instance.screenW;
        this.background.height = DominoGame.instance.screenH;

        Pivot.center(this.title, false);
        Pivot.center(this.walletTitle, false);
        Pivot.center(this.background, true, false);

        this.background.y = -100;
        this.title.x = -480;
        this.closeButton.x = 460;
        this.infoItems.forEach((item, i) => {
            item.y = i * 160 + 140;
        });
        this.walletTitle.x = -480;
        this.walletTitle.y = 800;
        this.walletItem.y = 940;
    }

    onAffiliateClick() {

    }

    onNewsClick() {

    }

    onChatClick() {

    };

    onAgreementClick() {

    };

    onWalletClick() {
        (PlatformService.platformApi as TelegramApi).openModal();
    }

    onCloseButtonClick(): void {
        dispatchEvent(new MessageEvent(GameEvents.SHOW_LOBBY_SETTINGS, {data: false}));
    }

    destroy(): void {
        this.removeChild(this.title);
        this.removeChild(this.closeButton);
        this.removeChild(this.walletTitle);
        this.removeChild(this.walletItem);

        this.title.destroy();
        this.closeButton.destroy();
        this.walletTitle.destroy();
        this.walletItem.destroy();

        while (this.infoItems.length) {
            const infoItem = this.infoItems.shift();
            infoItem.destroy();
            this.removeChild(infoItem);
        }

        this.title = null;
        this.closeButton = null;
        this.walletTitle = null;
        this.walletItem = null;
        this.infoItems = null;
        this.infoConfigs = null;

        super.destroy();
    }
}
