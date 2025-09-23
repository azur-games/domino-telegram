import {Point} from "pixi.js";
import {GameEvents} from "../GameEvents";


export type OnClaimCoinsEventPayload = {
    startPosition: Point,
    endPosition?: Point,
    coinsAmount: number,
    onComplete: Function,
}

export class OnClaimCoins extends CustomEvent<OnClaimCoinsEventPayload> {
    constructor(detail: OnClaimCoinsEventPayload) {
        super(GameEvents.ON_CLAIM_COINS, {detail});
    }
}