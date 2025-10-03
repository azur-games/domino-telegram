import {Point} from "pixi.js";
import {DominoGame} from "../app";
import {Balance} from "../domino_game/root/screens/lobby_screen/Balance";
import {DynamicData} from "../DynamicData";
import {OnClaimCoins} from "../game_events/OnClaimCoins";
import {GameEvents} from "../GameEvents";
import {SoundsPlayer} from "../services/SoundsPlayer";
import {FlyCoins} from "./claim_coins/FlyCoins";
import {StageResizeListening, Timeout} from "@azur-games/pixi-vip-framework";


export class ClaimCoins extends StageResizeListening {
    private initialBalanceAmount: number = 0;
    private animationTimes: number = 5;
    balance: Balance;
    private flyCoins: FlyCoins;
    private endPosition: Point;
    private startPosition: Point;
    private onClaimCoinsBindThis: (e: OnClaimCoins) => void;
    private balanceHidden: boolean = false;

    constructor(initialLockBalance: number = DynamicData.myProfile.coins, private coinsScale: number = .5) {
        super();
        this.createChildren();
        this.addChildren();
        this.onGameScaleChanged();
        this.lockBalance(initialLockBalance);
        this.onClaimCoinsBindThis = this.onClaimCoins.bind(this);
        addEventListener(GameEvents.ON_CLAIM_COINS, this.onClaimCoinsBindThis);
    }

    createChildren(): void {
        this.balance = new Balance();
        this.flyCoins = new FlyCoins(this.coinsScale);
    }

    addChildren(): void {
        this.addChild(this.balance);
        this.addChild(this.flyCoins);
    }

    lockBalance(lockedAmount: number): void {
        this.initialBalanceAmount = lockedAmount;
        this.balance.skipBalanceUpdate = true;
    }

    onClaimCoins(e: OnClaimCoins): void {
        let startPosition: Point = e.detail.startPosition;
        let endPosition: Point = e.detail.endPosition;
        let coinsAmount: number = e.detail.coinsAmount;
        let onComplete: Function = e.detail.onComplete;
        endPosition && (this.endPosition = endPosition);
        this.claimCoins(startPosition, coinsAmount, onComplete);
    }

    async claimCoins(startPosition: Point, coinsAmount: number, onComplete: Function = null): Promise<void> {
        this.startPosition = startPosition;
        this.startAnimation(coinsAmount);
        await Timeout.milliseconds(2500);
        onComplete && onComplete();
    }

    async startAnimation(amountToAdd: number): Promise<void> {
        let balanceAmountAfterAnimation: number = this.initialBalanceAmount;
        SoundsPlayer.playWithoutFocus("fallingCoins");
        SoundsPlayer.playWithoutFocus("openCashbox");
        let density: number = .5;
        await new Promise<void>(async resolve => {
            for (let i = 0; i < this.animationTimes; i++) {
                this.flyCoins.flyCoin(this.startPosition, this.endPosition);
                await Timeout.milliseconds(30 / density + Math.random() * 5);
                this.flyCoins.flyCoin(this.startPosition, this.endPosition);
                await Timeout.milliseconds(30 / density + Math.random() * 5);
                this.flyCoins.flyCoin(this.startPosition, this.endPosition);
                await Timeout.milliseconds(30 / density + Math.random() * 5);
                balanceAmountAfterAnimation = parseFloat((balanceAmountAfterAnimation + amountToAdd / this.animationTimes).toFixed(1));
                this.balance.update(balanceAmountAfterAnimation);
            }
            resolve();
        });
        this.lockBalance(DynamicData.myProfile.coins);
    }

    onGameScaleChanged(): void {
        this.balance.x = -DominoGame.instance.screenW / 2 + 200;
        this.balance.y = -DominoGame.instance.screenH / 2 + 70;
        this.balanceHidden || (this.endPosition = new Point(this.balance.x - 90, this.balance.y));
    }

    hideBalance() {
        this.balance.visible = false;
        this.balanceHidden = true;
    }

    destroy(): void {
        removeEventListener(GameEvents.ON_CLAIM_COINS, this.onClaimCoinsBindThis);
        this.onClaimCoinsBindThis = null;

        this.removeChild(this.balance);
        this.removeChild(this.flyCoins);

        this.balance.destroy();
        this.flyCoins.destroy();

        this.balance = null;
        this.flyCoins = null;
        this.endPosition = null;
        this.startPosition = null;

        super.destroy();
    }
}
