import {DisplayObjectFactory, LanguageText, Pivot, ScrollItem, StringUtils, TxData} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane} from "pixi.js";
import {TonTransactionData} from "../../../../../../services/socket_service/socket_message_data/TonTransactionData";
import {CurrencyConverter} from "../../../../../../utils/CurrencyConverter";


export class TxHistoryListItem extends ScrollItem {
    background: NineSlicePlane;
    amountText: LanguageText;
    timeText: LanguageText;

    constructor(private txData: TonTransactionData, private withBg: boolean) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("common/history_bg", 1, 1, 1, 1);
        this.amountText = new LanguageText({key: this.createAmountText(this.txData.nanotons), fontSize: 40, fill: this.txData.nanotons < 0 ? 0xFE7C7C : 0xF1F3FF});
        this.timeText = new LanguageText({key: StringUtils.formatRelativeDate(this.txData.createdAt), fontSize: 28, fontWeight: "500", fill: 0x6C8DDF});
    }

    addChildren(): void {
        this.addChild(this.background).visible = this.withBg;
        this.addChild(this.amountText);
        this.addChild(this.timeText);
    }

    initChildren(): void {
        this.background.width = 960;
        this.background.height = 97;

        Pivot.center(this.background);
        this.amountText.anchor.set(0, 0.5);
        this.timeText.anchor.set(1, .5);

        this.amountText.x = -450;
        this.timeText.x = 450;
    }

    createAmountText(nanotons: number): string {
        let prefix = nanotons < 0 ? "-$" : "+$";
        return prefix + Math.abs(parseFloat(CurrencyConverter.nanotonToUSD(nanotons)));
    }

    destroy(): void {
        this.removeChild(this.background);
        this.removeChild(this.amountText);
        this.removeChild(this.timeText);

        this.background.destroy();
        this.amountText.destroy();
        this.timeText.destroy();

        this.background = null;
        this.amountText = null;
        this.timeText = null;
        super.destroy();
    }
}
