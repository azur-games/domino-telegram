import {Sprite, Point} from "pixi.js";
import {Button} from "@azur-games/pixi-vip-framework";
import {CheckTxButton} from "./address_block/CheckTxButton";


export class AddressBlock extends Sprite {
    private copyButton: Button;
    private checkTxButton: CheckTxButton;
    private address: string;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren() {
        this.copyButton = new Button({
            callback: this.copyToClipboard.bind(this),
            bgTextureName: "common/green_button",
            bgSizes: new Point(465, 94),
            bgCornersSize: 34,
            textKey: "Copy address",
            fontSize: 40,
            fontWeight: "400",
            textPosition: new Point(40, -6),
            iconTextureName: "deposit/copy_icon",
            iconPosition: new Point(-120, -4)
        });
        this.checkTxButton = new CheckTxButton();
    }

    addChildren() {
        this.addChild(this.copyButton);
        this.addChild(this.checkTxButton);
    }

    initChildren() {
        this.copyButton.x = -247;
        this.checkTxButton.x = 247;
    }

    applyData(address: string) {
        this.address = address;
    }

    private async copyToClipboard() {
        await navigator.clipboard.writeText(this.address);
        this.copyButton.languageText.changeText("Copied!");
        setTimeout(() => {
            this.copyButton.languageText.changeText("Copy address");
        }, 1500);
    }

    destroy() {
        this.removeChild(this.copyButton);
        this.removeChild(this.checkTxButton);
        this.copyButton.destroy();
        this.checkTxButton.destroy();
        this.copyButton = null;
        this.copyButton = null;

        super.destroy();
    }
}