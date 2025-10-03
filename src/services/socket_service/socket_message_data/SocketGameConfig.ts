import {SocketGameConfigCore as SGF} from "@azur-games/pixi-vip-framework";
import {GameType} from "./socket_game_config/GameType";


export interface SocketGameConfig extends SGF<GameType> {
    softBet?: number,
    softCommission?: number
    maxBalanceSoftCoins?: number
    minBalanceSoftCoins?: number
}
