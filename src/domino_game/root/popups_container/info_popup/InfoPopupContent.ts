import {NineSlicePlane, Sprite} from "pixi.js";
import {LanguageText} from "@azur-games/pixi-vip-framework";
import {DisplayObjectFactory} from "@azur-games/pixi-vip-framework";
import {GameEvents} from "../../../../GameEvents";
import {Pivot} from "@azur-games/pixi-vip-framework";
import {InfoPopupData} from "./InfoPopupData";


export class InfoPopupContent extends Sprite {
    private background: NineSlicePlane;
    private infoTextBackground: NineSlicePlane;
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
        this.background = DisplayObjectFactory.createNineSlicePlane("deposit/qr_bg", 20, 20, 20, 20);
        this.infoTextBackground = DisplayObjectFactory.createNineSlicePlane("lobby/avatar_bg", 36, 36, 36, 36);
        this.title = new LanguageText({key: this.data.titleText, fontSize: 60, fill: 0xffffff, autoFitWidth: 800});
        this.info = new LanguageText({key: this.data.infoText, fontSize: 40, fill: 0x7BA2FF, autoFitWidth: 740});
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.infoTextBackground);
        this.addChild(this.title);
        this.addChild(this.info);
    }

    initChildren(): void {
        this.background.width = 960;
        this.background.height = 440;
        this.infoTextBackground.width = 800;
        this.infoTextBackground.height = 200;

        Pivot.center(this.background);
        Pivot.center(this.infoTextBackground);
        Pivot.center(this.title);
        Pivot.center(this.info);

        this.title.y = -140;
        this.info.y = this.infoTextBackground.y = 40;
    }

    destroy(): void {
        this.data = null;

        this.removeChild(this.background);
        this.removeChild(this.infoTextBackground);
        this.removeChild(this.title);
        this.removeChild(this.info);

        this.background.destroy();
        this.infoTextBackground.destroy();
        this.title.destroy();
        this.info.destroy();

        this.background = null;
        this.infoTextBackground = null;
        this.title = null;
        this.info = null;

        super.destroy();
    }
}