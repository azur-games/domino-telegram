import {TweenMax} from "gsap";
import {NineSlicePlane, Point} from "pixi.js";
import {Button, DisplayObjectFactory, LanguageText, Pivot, StageResizeListening} from "@azur-games/pixi-vip-framework";
import {DominoGame} from "../../../../app";
import {DynamicData} from "../../../../DynamicData";
import {GameEvents} from "../../../../GameEvents";
import {AvatarService} from "../../../../services/AvatarService";
import {SocketService} from "../../../../services/SocketService";
import {AvatarsList} from "./profile_edit_popup_content/AvatarsList";
import {ProfileEditInfo} from "./profile_edit_popup_content/ProfileEditInfo";
import {ProfileNameInput} from "./profile_edit_popup_content/ProfileNameInput";


export class ProfileEditPopupContent extends StageResizeListening {
    private chosenAvatar: string = AvatarService.getAvatarTextureNameByProfile(DynamicData.myProfile);
    private background: NineSlicePlane;
    private backButton: Button;
    private title: LanguageText;
    private input: ProfileNameInput;
    private info: ProfileEditInfo;
    private avatarsTitle: LanguageText;
    private avatars: AvatarsList;
    private bottomGradient: NineSlicePlane;
    private updateButton: Button;
    private onAvatarChooseBindThis: (e: MessageEvent) => void;
    private brightnessTween: TweenMax;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.onGameScaleChanged();
        this.tryToEnableSaveButton();

        this.onAvatarChooseBindThis = this.onAvatarChoose.bind(this);
        addEventListener(GameEvents.CHOOSE_AVATAR, this.onAvatarChooseBindThis);
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/lobby_bg", 1, 1, 1, 1);
        this.backButton = new Button({
            callback: this.onClose.bind(this),
            iconTextureName: "deposit/right_arrow_icon"
        });
        this.title = new LanguageText({key: "My Profile", fontSize: 56, fontWeight: "500"});
        this.input = new ProfileNameInput(this.onNameChanged.bind(this));
        this.info = new ProfileEditInfo();
        this.avatarsTitle = new LanguageText({key: "Choose your avatar", fontSize: 40, fill: 0xF1F3FF, fontWeight: "500"});
        this.avatars = new AvatarsList();
        this.bottomGradient = DisplayObjectFactory.createNineSlicePlane("edit_profile/bottom_gradient", 1, 1, 1, 1);
        this.updateButton = new Button({
            callback: this.onUpdateButtonClick.bind(this),
            bgTextureName: "common/green_button",
            bgSizes: new Point(366, 94),
            bgCornersSize: 34,
            textKey: "UPDATE",
            fontSize: 40,
            fontWeight: "500",
            fontColor: 0xF1F3FF,
            textPosition: new Point(0, -4)
        });
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.backButton);
        this.addChild(this.title);
        this.addChild(this.input);
        this.addChild(this.info);
        this.addChild(this.avatarsTitle);
        this.addChild(this.avatars);
        this.addChild(this.bottomGradient);
        this.addChild(this.updateButton);
    }

    onGameScaleChanged() {
        this.background.width = DominoGame.instance.screenW;
        this.background.height = DominoGame.instance.screenH;
        this.bottomGradient.width = DominoGame.instance.screenH;
        this.bottomGradient.height = 300;
        this.bottomGradient.interactive = this.bottomGradient.interactiveChildren = true;

        this.backButton.icon.rotation = Math.PI;

        Pivot.center(this.backButton.icon);
        Pivot.center(this.background);
        Pivot.center(this.title);
        Pivot.center(this.bottomGradient);
        Pivot.center(this.avatarsTitle, false);

        this.backButton.x = -DominoGame.instance.screenW / 2 + 96;
        this.backButton.y = -DominoGame.instance.screenH / 2 + 96;
        this.title.y = -DominoGame.instance.screenH / 2 + 96;
        this.input.y = -DominoGame.instance.screenH / 2 + 220;
        this.info.y = -DominoGame.instance.screenH / 2 + 330;
        this.avatarsTitle.y = -DominoGame.instance.screenH / 2 + 580;
        this.avatarsTitle.x = -480;
        this.avatars.y = -DominoGame.instance.screenH / 2 + 630;
        this.bottomGradient.y = DominoGame.instance.screenH / 2 - 150;
        this.updateButton.y = DominoGame.instance.screenH / 2 - 120;
    }

    onNameChanged(): void {
        this.tryToEnableSaveButton();
    }

    onAvatarChoose(e: MessageEvent): void {
        let avatar: string = e.data;
        this.chosenAvatar = avatar;
        this.tryToEnableSaveButton();
    }

    tryToEnableSaveButton(): void {
        let changesWasMade: boolean = this.avatarHasChanged || this.nameHasChanged;
        let active = changesWasMade && this.input.valid;
        this.updateButton.enabled = active;

        this.brightnessTween?.kill();
        this.brightnessTween = TweenMax.to(this.updateButton, .4, {brightness: active ? 1 : .7});
    }

    get avatarHasChanged(): boolean {
        return this.chosenAvatar != AvatarService.getAvatarTextureNameByProfile(DynamicData.myProfile);
    }

    get nameHasChanged(): boolean {
        return this.input.input.text.toString() != DynamicData.myProfile.name;
    }

    async onUpdateButtonClick(): Promise<void> {
        this.avatarHasChanged && await this.setAvatar();
        this.nameHasChanged && await this.setName();
        this.onClose();
    }

    async setAvatar(): Promise<void> {
        await SocketService.setPlayerIcon(AvatarService.getIconByTextureName(this.chosenAvatar));
    }

    async setName(): Promise<void> {
        await SocketService.setPlayerName(this.input.input.text.toString());
    }

    onClose(): void {
        if (this.avatars.dragged) {
            return;
        }
        dispatchEvent(new MessageEvent(GameEvents.CLOSE_EDIT_PROFILE_POPUP));
    }

    destroy(): void {
        removeEventListener(GameEvents.CHOOSE_AVATAR, this.onAvatarChooseBindThis);
        this.onAvatarChooseBindThis = null;
        this.brightnessTween.kill();
        this.brightnessTween = null;

        this.removeChild(this.background);
        this.removeChild(this.backButton);
        this.removeChild(this.title);
        this.removeChild(this.input);
        this.removeChild(this.info);
        this.removeChild(this.avatarsTitle);
        this.removeChild(this.avatars);
        this.removeChild(this.bottomGradient);
        this.removeChild(this.updateButton);

        this.background.destroy();
        this.backButton.destroy();
        this.title.destroy();
        this.input.destroy();
        this.info.destroy();
        this.avatarsTitle.destroy();
        this.avatars.destroy();
        this.bottomGradient.destroy();
        this.updateButton.destroy();

        this.background = null;
        this.backButton = null;
        this.title = null;
        this.input = null;
        this.info = null;
        this.avatarsTitle = null;
        this.avatars = null;
        this.bottomGradient = null;
        this.updateButton = null;

        super.destroy();
    }
}