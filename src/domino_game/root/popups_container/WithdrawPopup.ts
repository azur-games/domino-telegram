import {PopupAnimation} from "@azur-games/pixi-vip-framework";
import {BasePopup} from "@azur-games/pixi-vip-framework";
import {WithdrawPopupContent} from "./withdraw_popup/WithdrawPopupContent";


export class WithdrawPopup extends BasePopup<WithdrawPopupContent> {
    constructor() {
        super({clickable: false, animationType: PopupAnimation.FADE_IN});
        this.content = new WithdrawPopupContent();
        this.addChild(this.content);
        this.initChildren();
        this.show(true);
    }
}