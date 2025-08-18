import {Sprite} from "pixi.js";
import {LanguageText, Pivot} from "@azur-games/pixi-vip-framework";
import {DominoGame} from "../../../../../app";
import {WithdrawAddressInput} from "./address_withdrawal_page/WithdrawAddressInput";


export class AddressWithdrawalPage extends Sprite {
    private titleText: LanguageText;
    private addressInput: WithdrawAddressInput;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.titleText = new LanguageText({
            key: "Add your TON address for withdrawal:",
            fontSize: 56,
            fontWeight: "500",
            fill: 0xF1F3FF,
        });
        this.addressInput = new WithdrawAddressInput();
    }

    addChildren(): void {
        this.addChild(this.titleText);
        this.addChild(this.addressInput);
    }

    initChildren(): void {
        this.titleText.style.wordWrap = true;
        this.titleText.style.wordWrapWidth = 900;
        Pivot.center(this.titleText);
        this.titleText.y = -DominoGame.instance.screenH / 2 + 110;
        this.addressInput.y = -DominoGame.instance.screenH / 2 + 300;
    }

    destroy(): void {
        this.removeChild(this.titleText);
        this.removeChild(this.addressInput);
        this.titleText.destroy();
        this.addressInput.destroy();
        this.titleText = null;
        this.addressInput = null;
        super.destroy();
    }
}
