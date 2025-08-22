import {Point} from "pixi.js";
import {ScrollContainer, TxData} from "@azur-games/pixi-vip-framework";
import {SocketService} from "../../../../../services/SocketService";
import {TxHistoryListItem} from "./tx_history_list/TxHistoryListItem";


export class TxHistoryList extends ScrollContainer<TxHistoryListItem> {

    constructor() {
        super({
            maskSizes: new Point(960, 1900),
            maskPosition: new Point(0, 950),
            marginBetweenItems: 97,
            bottomMargin: 40
        });
        this.init();
    }

    async init() {
        const txs = await SocketService.tonFetch();
        this.createRooms(txs);
    }

    createRooms(txs: TxData[]): void {
        this.createList(txs.map((data, i) => new TxHistoryListItem(data, Boolean(i % 2))), 49);
        this.list.scrollable = false;
    }
}