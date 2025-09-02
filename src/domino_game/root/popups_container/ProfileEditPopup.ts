import {BasePopup, PopupAnimation} from "@azur-games/pixi-vip-framework";
import {ProfileEditPopupContent} from "./profile_edit_popup/ProfileEditPopupContent";


export class ProfileEditPopup extends BasePopup<ProfileEditPopupContent> {

    constructor() {
        super({overlayAlpha: 0.2, animationType: PopupAnimation.FADE_IN});
        this.content = new ProfileEditPopupContent();
        this.addChild(this.content);
        this.initChildren();
        this.show(true);
    }

    onOverlayClick() {
        this.content.onClose();
    }
}