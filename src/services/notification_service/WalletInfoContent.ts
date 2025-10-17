import {Sprite} from "pixi.js";
import {LanguageText, Pivot} from "@azur-games/pixi-vip-framework";
import {StringUtils} from "../../utils/StringUtils";


export class WalletInfoContent extends Sprite {
    private walletNameText: LanguageText;
    private addressText: LanguageText;

    constructor(private walletName: string, private address: string) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.walletNameText = new LanguageText({key: this.walletName, fontSize: 46, fill: 0x83A1F8});
        this.addressText = new LanguageText({key: StringUtils.truncAddress(this.address), fontSize: 35});
    }

    addChildren(): void {
        this.addChild(this.walletNameText);
        this.addChild(this.addressText);
    }

    initChildren(): void {
        Pivot.center(this.walletNameText);
        Pivot.center(this.addressText);

        this.walletNameText.y = -80;
        this.addressText.y = 30;
    }

    destroy(): void {
        this.removeChild(this.walletNameText);
        this.removeChild(this.addressText);

        this.walletNameText.destroy();
        this.addressText.destroy();

        this.walletNameText = null;
        this.addressText = null;

        super.destroy();
    }
}
