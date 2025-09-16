import {Point} from "pixi.js";
import {ScrollContainer, TxData} from "@azur-games/pixi-vip-framework";
import {TonTransactionData} from "../../../../../services/socket_service/socket_message_data/TonTransactionData";
import {SocketService} from "../../../../../services/SocketService";
import {TxHistoryListItem} from "./tx_history_list/TxHistoryListItem";


export class TxHistoryList extends ScrollContainer<TxHistoryListItem> {

    constructor() {
        super({
            maskSizes: new Point(960, 1900),
            maskPosition: new Point(0, 950),
            marginBetweenItems: 97,
            bottomMargin: 340
        });
        this.init();
    }

    async init() {
        const txs = await SocketService.tonTransactions();
        this.createRooms(txs.filter(tx => ["topup", "payout"].includes(tx.productId)).reverse());
    }

    createRooms(txs: TonTransactionData[]): void {
        this.createList(txs.map((data, i) => new TxHistoryListItem(data, Boolean(i % 2))), 49);
        // this.list.scrollable = false;
    }
}