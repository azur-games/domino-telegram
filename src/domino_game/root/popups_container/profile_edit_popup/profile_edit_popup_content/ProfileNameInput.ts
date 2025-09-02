import {DisplayObjectFactory, Pivot, Button, Timeout} from "@azur-games/pixi-vip-framework";
import {TextInput} from "pixi-textinput-v5";
import {NineSlicePlane, Sprite} from "pixi.js";
import {DynamicData} from "../../../../../DynamicData";
import {Settings} from "../../../../../Settings";


export class ProfileNameInput extends Sprite {
    private background: NineSlicePlane;
    input: TextInput;

    private editButton: Button;

    constructor(private callback: Function) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();

        //@ts-ignore
        this.input.htmlInput.style.display = 'block';
        this.focusInput();
    }

    async focusInput() {
        await Timeout.milliseconds(200);
        this.input.focus();
    }

    get valid(): boolean {
        let value = this.input.text as unknown as string;
        return /^[a-zA-Z0-9]{3,13}$/.test(value);
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
        this.input.htmlInput.style.display = 'none';
        this.editButton = new Button({
            callback: this.onEditButtonClick.bind(this),
            bgTextureName: "profile/edit_button"
        });
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.input);
        this.addChild(this.editButton);
    }

    initChildren(): void {
        //@ts-ignore
        this.input.text = DynamicData.myProfile.name;
        //@ts-ignore
        this.input.placeholder = "Enter your name";
        this.input._placeholderColor = 0x38508C;

        this.background.width = 960;
        this.background.height = 88;

        Pivot.center(this.background);
        Pivot.center(this.input);

        this.input.x = -40;
        this.editButton.x = 430;
    }

    async onEditButtonClick(): Promise<void> {

    }

    tryToInput(value: string): void {
        this.callback();
    }

    destroy(): void {
        this.removeChild(this.background);
        this.removeChild(this.input);
        this.removeChild(this.editButton);

        this.background.destroy();
        this.input.destroy();
        this.editButton.destroy();

        this.background = null;
        this.input = null;
        this.editButton = null;

        super.destroy();
    }
}