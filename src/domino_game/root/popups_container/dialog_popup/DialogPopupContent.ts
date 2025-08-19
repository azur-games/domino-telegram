import {Button, DisplayObjectFactory, LanguageText, Pivot} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane, Point, Sprite} from "pixi.js";
import {GameEvents} from "../../../../GameEvents";
import {DialogPopupData} from "./DialogPopupData";


export class DialogPopupContent extends Sprite {
    private background: NineSlicePlane;
    private titleBackground: NineSlicePlane;
    private title: LanguageText;
    private content: Sprite;
    private yesButton: Button;
    private noButton: Button;

    constructor(private data: DialogPopupData) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    onOverlayClick(): void {
        this.onCancel();
    }

    onConfirm(): void {
        this.data.resolve(true);
        dispatchEvent(new MessageEvent(GameEvents.CLOSE_DIALOG_POPUP));
    }

    onCancel(): void {
        this.data.resolve(false);
        dispatchEvent(new MessageEvent(GameEvents.CLOSE_DIALOG_POPUP));
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("common/notification_bg", 47, 47, 47, 47);
        this.titleBackground = DisplayObjectFactory.createNineSlicePlane("common/notification_header_bg", 50, 50, 50, 50);
        this.title = new LanguageText({key: this.data.titleText, fontSize: 56, fill: 0xffffff, autoFitWidth: 550});
        this.content = this.data.content;
        this.yesButton = new Button({
            callback: this.onConfirm.bind(this),
            textKey: this.data.yesText,
            bgTextureName: "common/green_button",
            bgCornersSize: 34,
            bgSizes: new Point(203, 96),
            fontSize: 40,
            fontWeight: "400",
            textPosition: new Point(0, -6),
            autoFitWidth: 180
        });
        if (this.data.okButtonOnly) {
            return;
        }
        this.noButton = new Button({
            callback: this.onCancel.bind(this),
            textKey: this.data.noText,
            bgTextureName: "common/ButtonRed", bgCornersSize: 52,
            bgSizes: new Point(370, 75),
            fontSize: 32,
            textPosition: new Point(0, -4),
            autoFitWidth: 250
        });
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.titleBackground);
        this.addChild(this.title);
        this.addChild(this.content);
        this.addChild(this.yesButton);
        this.data.okButtonOnly || this.addChild(this.noButton);
    }

    initChildren(): void {
        this.background.width = 600;
        this.background.height = 530;
        this.titleBackground.width = 600;
        this.titleBackground.height = 112;

        Pivot.center(this.background);
        Pivot.center(this.titleBackground);
        Pivot.center(this.title);
        Pivot.center(this.content);

        this.titleBackground.y = this.title.y = -208;

        this.yesButton.y = 200;
        this.yesButton.backgroundImage.width = Math.max(this.yesButton.languageText.width + 40, this.yesButton.backgroundImage.width);
        Pivot.center(this.yesButton.backgroundImage);

        if (this.data.okButtonOnly) {
            return;
        }

        this.yesButton.x = -this.noButton.backgroundImage.width / 2 - 20;

        this.noButton.y = 200;
        this.noButton.languageText.style.stroke = 0xca2058;
        this.noButton.languageText.style.strokeThickness = 6;
        this.noButton.backgroundImage.width = Math.max(this.noButton.languageText.width + 40, this.noButton.backgroundImage.width);
        Pivot.center(this.noButton.backgroundImage);
        this.noButton.x = this.yesButton.backgroundImage.width / 2 + 20;
    }

    destroy(): void {
        this.data = undefined;

        this.removeChild(this.background);
        this.removeChild(this.title);
        this.removeChild(this.content);
        this.removeChild(this.yesButton);
        this.removeChild(this.noButton);

        this.background.destroy();
        this.title.destroy();
        this.content.destroy();
        this.yesButton.destroy();
        this.noButton?.destroy();

        this.background = null;
        this.title = null;
        this.content = null;
        this.yesButton = null;
        this.noButton = null;

        super.destroy();
    }
}