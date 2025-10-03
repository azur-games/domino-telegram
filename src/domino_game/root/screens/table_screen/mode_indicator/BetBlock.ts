import {Sprite, Text} from "pixi.js";
import {DynamicData} from "../../../../../DynamicData";
import {DisplayObjectFactory} from "@azur-games/pixi-vip-framework";
import {TextFactory} from "../../../../../factories/TextFactory";
import {CurrencyService} from "../../../../../services/CurrencyService";
import {SocketGameConfig} from "../../../../../services/socket_service/socket_message_data/SocketGameConfig";
import {StaticData} from "../../../../../StaticData";
import {Pivot} from "@azur-games/pixi-vip-framework";


export class BetBlock extends Sprite {
    private currencyIcon: Sprite;
    private betText: Text;

    constructor() {
        super();

        this.createChildren();
        this.addChildren();
        this.initChildren();
        let gameConfig: SocketGameConfig = StaticData.gamesConfig.find(gameConfig => gameConfig.gameMode == DynamicData.socketGameRequest.mode && gameConfig.gameType == DynamicData.socketGameRequest.type);
        let cost: number = CurrencyService.isThisSoftCurrencyRoom(gameConfig) ? gameConfig.softBet : gameConfig.bet;
        this.setBetText(cost?.toString());
    }

    private createChildren() {
        this.currencyIcon = DisplayObjectFactory.createSprite(CurrencyService.currencyIcon);
        this.betText = TextFactory.createCommissioner({
            value: "",
            fontSize: 44,
        });
    }

    private addChildren() {
        this.addChild(this.currencyIcon);
        this.addChild(this.betText);
    }

    private initChildren() {
        this.currencyIcon.scale.set(.42);
        Pivot.center(this.currencyIcon);

        this.betText.style.stroke = 0x623895;
        this.betText.style.strokeThickness = 4;

        this.betText.y = -3;
    }

    destroy() {
        super.destroy();
    }

    private setBetText(value: string) {
        this.betText.text = value;
        Pivot.center(this.betText);
        this.betText.x = this.currencyIcon.width / 2 + 3;
        this.currencyIcon.x = -this.betText.width / 2 - 3;
    }
}