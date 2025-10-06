import {LanguageText, NumberUtils} from "@azur-games/pixi-vip-framework";
import {Point, Sprite} from "pixi.js";
import {Button} from "../../../../../../pixi-vip-framework";
import {DominoGame} from "../../../../app";
import {DynamicData} from "../../../../DynamicData";
import {GameEvents} from "../../../../GameEvents";
import {AvatarService} from "../../../../services/AvatarService";
import {CurrencyService} from "../../../../services/CurrencyService";
import {MetricaEvents, MetricaService} from "../../../../services/MetricaService";
import {CurrencyConverter} from "../../../../utils/CurrencyConverter";
import {LobbyHeaderAvatar} from "./lobby_header/LobbyHeaderAvatar";
import {LobbyHeaderBalance} from "./lobby_header/LobbyHeaderBalance";


export class LobbyHeader extends Sprite {
    private avatar: LobbyHeaderAvatar;
    private playerName: LanguageText;
    private balance: LobbyHeaderBalance;
    private depositButton: Button;
    private withdrawButton: Button;
    private historyButton: Button;
    private onProfileUpdatedBindThis: (e: Event) => void;
    private onCurrencyChangedBindThis: (e: Event) => void;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.resize();
        this.onProfileUpdated();
        this.onProfileUpdatedBindThis = this.onProfileUpdated.bind(this);
        addEventListener(GameEvents.PROFILE_UPDATED, this.onProfileUpdatedBindThis);
        this.onCurrencyChangedBindThis = this.onCurrencyChanged.bind(this);
        addEventListener(GameEvents.CURRENCY_CHANGED, this.onCurrencyChangedBindThis);
    }

    createChildren(): void {
        this.avatar = new LobbyHeaderAvatar();
        this.playerName = new LanguageText({key: "", fontSize: 32, fontWeight: "500", fill: 0xDAEDFF});
        this.balance = new LobbyHeaderBalance();
        this.depositButton = new Button({
            callback: this.onDepositClick.bind(this),
            bgTextureName: "lobby/round_green_button",
            iconTextureName: "lobby/deposit_icon",
            iconPosition: new Point(0, -3),
            textKey: "Deposit",
            fontSize: 32,
            fontWeight: "400",
            fontColor: 0x7BA2FF,
            textPosition: new Point(0, 85)
        });
        this.withdrawButton = new Button({
            callback: this.onWithdrawClick.bind(this),
            bgTextureName: "lobby/round_green_button",
            iconTextureName: "lobby/withdraw_icon",
            iconPosition: new Point(0, -3),
            textKey: "Withdraw",
            fontSize: 32,
            fontWeight: "400",
            fontColor: 0x7BA2FF,
            textPosition: new Point(0, 85)
        });
        this.historyButton = new Button({
            callback: this.onHistoryClick.bind(this),
            bgTextureName: "lobby/round_green_button",
            iconTextureName: "lobby/history_icon",
            iconPosition: new Point(0, -3),
            textKey: "History",
            fontSize: 32,
            fontWeight: "400",
            fontColor: 0x7BA2FF,
            textPosition: new Point(0, 85)
        });
    }

    addChildren(): void {
        this.addChild(this.avatar);
        this.addChild(this.playerName);
        this.addChild(this.balance);
        this.addChild(this.depositButton);
        this.addChild(this.withdrawButton);
        this.addChild(this.historyButton);
    }

    resize(): void {
        this.y = -DominoGame.instance.screenH / 2;
        this.avatar.y = 200;
        this.avatar.x = DominoGame.instance.screenW / 2 - 175;
        this.playerName.y = 120;
        this.balance.y = 180;
        this.balance.x = this.playerName.x = -DominoGame.instance.screenW / 2 + 95;

        this.depositButton.y = this.withdrawButton.y = this.historyButton.y = 400;
        this.depositButton.x = -300;
        this.historyButton.x = 300;
    }

    onProfileUpdated(): void {
        this.playerName.text = DynamicData.myProfile.name;
        this.avatar.setAvatar(AvatarService.getAvatarTextureNameByProfile(DynamicData.myProfile));
        this.updateBalance();
    }

    onCurrencyChanged(): void {
        this.updateBalance();
    }

    updateBalance(): void {
        this.balance.setBalance(CurrencyService.isHardModeNow ? NumberUtils.shortPriceFormat(CurrencyConverter.coinsToUSD(DynamicData.myProfile.coins)) : DynamicData.myProfile.softCoins.toString());

    }

    onDepositClick(): void {
        MetricaService.sendEvent(MetricaEvents.OPEN_DEPOSIT);
        dispatchEvent(new MessageEvent(GameEvents.OPEN_DEPOSIT_POPUP));
    }

    onWithdrawClick(): void {
        MetricaService.sendEvent(MetricaEvents.OPEN_WITHDRAW);
        dispatchEvent(new MessageEvent(GameEvents.OPEN_WITHDRAW_POPUP));
    }

    onHistoryClick(): void {
        MetricaService.sendEvent(MetricaEvents.OPEN_HISTORY);
        dispatchEvent(new MessageEvent(GameEvents.OPEN_HISTORY_POPUP));
    }

    destroy(): void {
        removeEventListener(GameEvents.PROFILE_UPDATED, this.onProfileUpdatedBindThis);
        removeEventListener(GameEvents.CURRENCY_CHANGED, this.onCurrencyChangedBindThis);
        this.onProfileUpdatedBindThis = null;
        this.onCurrencyChangedBindThis = null;

        this.removeChild(this.avatar);
        this.removeChild(this.playerName);
        this.removeChild(this.balance);
        this.removeChild(this.depositButton);
        this.removeChild(this.withdrawButton);
        this.removeChild(this.historyButton);

        this.avatar.destroy();
        this.playerName.destroy();
        this.balance.destroy();
        this.depositButton.destroy();
        this.withdrawButton.destroy();
        this.historyButton.destroy();

        this.avatar = null;
        this.playerName = null;
        this.balance = null;
        this.depositButton = null;
        this.withdrawButton = null;
        this.historyButton = null;

        super.destroy();
    }
}
