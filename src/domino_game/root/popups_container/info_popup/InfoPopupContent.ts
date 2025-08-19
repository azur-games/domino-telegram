import {NineSlicePlane, Sprite} from "pixi.js";
import {LanguageText} from "@azur-games/pixi-vip-framework";
import {DisplayObjectFactory} from "@azur-games/pixi-vip-framework";
import {GameEvents} from "../../../../GameEvents";
import {Pivot} from "@azur-games/pixi-vip-framework";
import {InfoPopupData} from "./InfoPopupData";


export class InfoPopupContent extends Sprite {
    private background: NineSlicePlane;
    private titleBackground: NineSlicePlane;
    private title: LanguageText;
    private info: LanguageText;

    constructor(private data: InfoPopupData) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    onOverlayClick(): void {
        dispatchEvent(new MessageEvent(GameEvents.CLOSE_INFO_POPUP));
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("common/notification_bg", 47, 47, 47, 47);
        this.titleBackground = DisplayObjectFactory.createNineSlicePlane("common/notification_header_bg", 50, 50, 50, 50);
        this.title = new LanguageText({key: this.data.titleText, fontSize: 56, fill: 0xffffff, autoFitWidth: 550});
        this.info = new LanguageText({key: this.data.infoText, fontSize: 40, fill: 0x83A1F8, autoFitWidth: 550});
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.titleBackground);
        this.addChild(this.title);
        this.addChild(this.info);
    }

    initChildren(): void {
        this.background.width = 600;
        this.background.height = 530;
        this.titleBackground.width = 600;
        this.titleBackground.height = 112;

        Pivot.center(this.background);
        Pivot.center(this.titleBackground);
        Pivot.center(this.title);
        Pivot.center(this.info);

        this.titleBackground.y = this.title.y = -208;

        this.info.y = 56 - (this.info.height);
    }

    destroy(): void {
        this.data = null;

        this.removeChild(this.background);
        this.removeChild(this.titleBackground);
        this.removeChild(this.title);
        this.removeChild(this.info);

        this.background.destroy();
        this.titleBackground.destroy();
        this.title.destroy();
        this.info.destroy();

        this.background = null;
        this.titleBackground = null;
        this.title = null;
        this.info = null;

        super.destroy();
    }
}