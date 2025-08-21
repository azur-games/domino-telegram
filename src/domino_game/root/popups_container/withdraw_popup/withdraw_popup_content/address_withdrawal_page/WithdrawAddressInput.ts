import {DisplayObjectFactory, Pivot, LanguageText, TonRates, NumberUtils, Button, PlatformService, TelegramApi} from "@azur-games/pixi-vip-framework";
import {TextInput} from "pixi-textinput-v5";
import {NineSlicePlane, Sprite, Text} from "pixi.js";
import {WithdrawInputAddressChange} from "../../../../../../game_events/WithdrawInputAddressChange";
import {Settings} from "../../../../../../Settings";


export class WithdrawAddressInput extends Sprite {
    private background: NineSlicePlane;
    private input: TextInput;
    private qrButton: Button;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
        //@ts-ignore
        this.input.htmlInput.style.visibility = 'visible';
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("deposit/qr_bg", 30, 30, 30, 30);
        this.input = new TextInput({
            multiline: false,
            input: {
                multiline: false,
                fontSize: "40px",
                fontFamily: Settings.COMMISSIONER,
                fontWeight: "400",
                padding: "40px",
                width: "800px",
                color: "#ffffff",
                height: "0px",
                textAlign: "left",
                rows: 1
            },
        });
        this.input.on("input", this.tryToInput.bind(this), this);
        //@ts-ignore
        this.input.htmlInput.style.visibility = 'hidden';
        this.qrButton = new Button({
            callback: this.onQrButtonClick.bind(this),
            bgTextureName: "withdraw/withdraw_qr_button"
        });
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.input);
        this.addChild(this.qrButton);
    }

    initChildren(): void {
        //@ts-ignore
        this.input.placeholder = "Enter your address";
        this.input._placeholderColor = 0x38508C;
        this.input.focus();

        this.background.width = 960;
        this.background.height = 88;

        Pivot.center(this.background);
        Pivot.center(this.input);

        // this.input.x = -120;
        this.input.x = -40;
        this.qrButton.x = 430;
    }

    async onQrButtonClick(): Promise<void> {
        let result = await (PlatformService.platformApi as TelegramApi).scanQR();
        this.tryToInput(result);
    }

    tryToInput(value: string): void {
        dispatchEvent(new WithdrawInputAddressChange({address: value}));
    }

    destroy(): void {
        this.removeChild(this.background);
        this.removeChild(this.input);
        this.removeChild(this.qrButton);

        this.background.destroy();
        this.input.destroy();
        this.qrButton.destroy();

        this.background = null;
        this.input = null;
        this.qrButton = null;

        super.destroy();
    }
}