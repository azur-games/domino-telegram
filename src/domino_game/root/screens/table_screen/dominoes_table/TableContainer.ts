import {Sine, TweenMax} from "gsap/gsap-core";
import {IDestroyOptions} from "pixi.js";
import {Sprite3D} from "pixi3d";
import {WindowFocusController} from "@azur-games/pixi-vip-framework";
import {DynamicData} from "../../../../../DynamicData";
import {DominoCalculator} from "@azur-games/pixi-domino-core";


export class TableContainer extends Sprite3D {
    private moveTween: TweenMax;
    zoom: number = 1;//для портрета ставить 3-4

    constructor() {
        super();
        this.reset();
    }

    get scaling(): number {
        return this.scale.x / this.zoom;
    }

    set scaling(value: number) {
        this.scale.set(value * this.zoom);
    }

    async move(minX: number, maxX: number, minY: number, maxY: number, fast: boolean = !WindowFocusController.documentVisible): Promise<void> {
        let width: number = Math.abs(maxX - minX);
        let maxWidth: number = DominoCalculator.getMaxWidthAndHeight(DynamicData.socketGameRequest.mode).x;
        let tableGoScale: number = Math.min(maxWidth / width, 1);
        let tableGoX: number = (minX + width / 2) * tableGoScale * this.zoom;
        if (fast) {
            this.x = tableGoX;
            return;
        }
        this.moveTween?.kill();
        await WindowFocusController.wrapTween(this.moveTween = TweenMax.to(this, .3, {x: tableGoX, ease: Sine.easeInOut}));
    }

    destroy(options?: boolean | IDestroyOptions) {
        super.destroy(options);

        this.moveTween?.kill();
        this.moveTween = null;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.scaling = 1;
    }
}