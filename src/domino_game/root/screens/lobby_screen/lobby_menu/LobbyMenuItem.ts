import {Button} from "@azur-games/pixi-vip-framework";
import {Point} from "pixi.js";


export class LobbyMenuItem extends Button {
    constructor(callback: Function, icon: string, textKey: string) {
        super({
            callback: callback,
            bgTextureName: "lobby/menu_button_bg",
            bgCornersSize: 39,
            bgSizes: new Point(294, 156),
            iconTextureName: icon,
            iconPosition: new Point(0, icon == "lobby/menu_more_icon" ? -15 : -25),
            textKey: textKey,
            fontSize: 32,
            fontWeight: "400",
            textPosition: new Point(0, 30)
        });
    }

    fade(isFaded: boolean = true) {
        this.icon.tint = isFaded ? 0x314B8E : 0xffffff;
        this.languageText.tint = isFaded ? 0x314B8E : 0xffffff;
        this.setBackgroundCorners(isFaded ? 30 : 45);
        this.changeBackgroundImage("lobby/menu_button_bg" + (isFaded ? "_disable" : ""));
    }
}
