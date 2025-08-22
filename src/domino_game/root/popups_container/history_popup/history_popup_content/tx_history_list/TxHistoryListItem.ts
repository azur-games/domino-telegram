import {DisplayObjectFactory, LanguageText, Pivot, ScrollItem, TxData} from "@azur-games/pixi-vip-framework";
import {NineSlicePlane, Sprite} from "pixi.js";
import {CurrencyConverter} from "../../../../../../utils/CurrencyConverter";


export class TxHistoryListItem extends ScrollItem {
    background: NineSlicePlane;
    amountText: LanguageText;
    timeText: LanguageText;
    statusText: LanguageText;

    constructor(private txData: TxData, private withBg: boolean) {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("common/history_bg", 1, 1, 1, 1);
        this.amountText = new LanguageText({key: "+$" + CurrencyConverter.nanotonToUSD(parseInt(this.txData.nanotons)), fontSize: 40});
        this.timeText = new LanguageText({key: "Today", fontSize: 28, fontWeight: "500", fill: 0x6C8DDF});
        this.statusText = new LanguageText({key: "COMPLETED", fontSize: 40, fill: 0x35F583});
    }

    addChildren(): void {
        this.addChild(this.background).visible = this.withBg;
        this.addChild(this.amountText);
        this.addChild(this.timeText);
        this.addChild(this.statusText);
    }

    initChildren(): void {
        this.background.width = 960;
        this.background.height = 97;

        Pivot.center(this.background);
        this.amountText.anchor.set(0, 0.5);
        Pivot.center(this.timeText);
        this.statusText.anchor.set(1, .5);

        this.amountText.x = -450;
        this.timeText.x = -40;
        this.statusText.x = 450;
    }

    destroy(): void {
        this.removeChild(this.background);
        this.removeChild(this.amountText);
        this.removeChild(this.timeText);
        this.removeChild(this.statusText);

        this.background.destroy();
        this.amountText.destroy();
        this.timeText.destroy();
        this.statusText.destroy();

        this.background = null;
        this.amountText = null;
        this.timeText = null;
        this.statusText = null;
        super.destroy();
    }
}
