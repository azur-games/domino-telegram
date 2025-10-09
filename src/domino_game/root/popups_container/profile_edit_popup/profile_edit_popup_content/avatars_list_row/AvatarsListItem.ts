import {Device, DisplayObjectFactory, LoaderService, Pivot, ScrollItem} from "@azur-games/pixi-vip-framework";
import {TweenMax} from "gsap";
import {NineSlicePlane, Sprite} from "pixi.js";
import {Player} from "../../../../../../common/Player";
import {DynamicData} from "../../../../../../DynamicData";
import {GameEvents} from "../../../../../../GameEvents";
import {AvatarService} from "../../../../../../services/AvatarService";


export class AvatarsListItem extends ScrollItem {
    private background: NineSlicePlane;
    private player: Player;
    private selectedIcon: Sprite;
    private scaleTween: TweenMax;
    private alphaIconTween: TweenMax;
    private onAvatarChooseBindThis: (e: MessageEvent) => void;

    constructor(private avatar: string) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
        this.tryToMakeSelected(AvatarService.getAvatarTextureNameByProfile(DynamicData.myProfile));
        this.onAvatarChooseBindThis = this.onAvatarChoose.bind(this);
        addEventListener(GameEvents.CHOOSE_AVATAR, this.onAvatarChooseBindThis);
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("edit_profile/avatar_bg", 40, 40, 40, 40);
        this.player = new Player({
                callback: this.onClick.bind(this),
                showLevel: false
            },
            274);
        this.selectedIcon = DisplayObjectFactory.createSprite("edit_profile/selected_icon");
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.player);
        this.addChild(this.selectedIcon).alpha = 0;
    }

    initChildren(): void {
        this.background.width = 290;
        this.background.height = 290;

        this.player.setAvatar(this.avatar);
        this.player.background.alpha = 0.0001;
        Pivot.center(this.background);
        Pivot.center(this.selectedIcon);

        this.background.y = 4;
        this.selectedIcon.y = 90;
        this.selectedIcon.x = 90;
    }

    async tryToMakeSelected(avatar: string): Promise<void> {
        this.cacheAsBitmap = false;
        let selected: boolean = avatar == this.avatar;

        this.alphaIconTween?.kill();
        await new Promise(resolve => this.alphaIconTween = TweenMax.to(this.selectedIcon, .1, {
            alpha: selected ? 1 : 0,
            onComplete: resolve
        }));
        this.background.texture = LoaderService.getTexture("edit_profile/avatar_bg" + (selected ? "_active" : ""));
        Device.info.os.name === "Android" || (this.cacheAsBitmap = true);
    }

    onAvatarChoose(e: MessageEvent): void {
        let avatar: string = e.data;
        this.tryToMakeSelected(avatar);
    }

    onClick(): void {
        this.dragged || dispatchEvent(new MessageEvent(GameEvents.CHOOSE_AVATAR, {data: this.avatar}));
    }

    destroy(): void {
        this.cacheAsBitmap = false;

        removeEventListener(GameEvents.CHOOSE_AVATAR, this.onAvatarChooseBindThis);
        this.onAvatarChooseBindThis = null;

        this.scaleTween?.kill();
        this.alphaIconTween?.kill();

        this.scaleTween = null;
        this.alphaIconTween = null;

        this.removeChild(this.player);
        this.removeChild(this.background);
        this.removeChild(this.selectedIcon);

        this.background.destroy();
        this.player.destroy();
        this.selectedIcon.destroy();

        this.background = null;
        this.player = null;
        this.selectedIcon = null;

        super.destroy();
    }
}
