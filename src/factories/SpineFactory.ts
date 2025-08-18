import {ISkeletonData, Spine} from "pixi-spine";
import {CatAnimation, LoaderService} from "@azur-games/pixi-vip-framework";


export class SpineFactory {
    static createLevelUpSpine(): Spine {
        let spine: Spine = new Spine(LoaderService.loader.resources.level_up!.spineData);
        spine.state.setAnimation(0, "0-2", false);
        return spine;
    }

    static createGiftSpine(): Spine {
        let spine: Spine = new Spine(LoaderService.loader.resources.gifts!.spineData);
        spine.state.setEmptyAnimation(0, 0);
        return spine;
    }

    static createCat(animation: CatAnimation): Spine {
        let spineData: ISkeletonData = LoaderService.loader.resources["cats"]!.spineData;
        let spine: Spine = new Spine(spineData);
        spine.state.setAnimation(0, animation, true);
        return spine;
    }
}