import {Point} from "pixi.js";
import {BasePopup} from "@azur-games/pixi-vip-framework";
import {HistoryPopupContent} from "./history_popup/HistoryPopupContent";


export class HistoryPopup extends BasePopup<HistoryPopupContent> {

    constructor() {
        super({overlayAlpha: .2, clickable: false});
        this.content = new HistoryPopupContent();
        this.addChild(this.content);
        this.initChildren();
        this.show(true);
    }

    onOverlayClick() {
        this.content.onClose();
    }
}