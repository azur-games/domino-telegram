import {NineSlicePlane, Sprite} from "pixi.js";
import {Button, DisplayObjectFactory, LanguageText, Pivot, StageResizeListening} from "@azur-games/pixi-vip-framework";
import {DominoGame} from "../../../../app";
import {GameEvents} from "../../../../GameEvents";
import {TxHistoryList} from "./history_popup_content/TxHistoryList";


export class HistoryPopupContent extends StageResizeListening {
    private background: NineSlicePlane;
    private backButton: Button;
    private title: LanguageText;
    private historyList: TxHistoryList;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.onGameScaleChanged();
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/lobby_bg", 1, 1, 1, 1);
        this.backButton = new Button({
            callback: this.onClose.bind(this),
            iconTextureName: "deposit/right_arrow_icon"
        });
        this.title = new LanguageText({key: "History.Title", fontSize: 56, fontWeight: "500"});
        this.historyList = new TxHistoryList();
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.backButton);
        this.addChild(this.historyList);
        this.addChild(this.title);
    }

    onGameScaleChanged() {
        this.background.width = DominoGame.instance.screenW;
        this.background.height = DominoGame.instance.screenH;

        this.backButton.icon.rotation = Math.PI;

        Pivot.center(this.backButton.icon);
        Pivot.center(this.background);
        Pivot.center(this.title);

        this.backButton.x = -DominoGame.instance.screenW / 2 + 96;
        this.backButton.y = -DominoGame.instance.screenH / 2 + 96;
        this.title.y = -DominoGame.instance.screenH / 2 + 96;
        this.historyList.y = -DominoGame.instance.screenH / 2 + 200;

    }

    onClose(): void {
        dispatchEvent(new MessageEvent(GameEvents.CLOSE_HISTORY_POPUP));
    }

    destroy(): void {
        this.removeChild(this.background);
        this.removeChild(this.backButton);
        this.removeChild(this.title);
        this.removeChild(this.historyList);

        this.background.destroy();
        this.backButton.destroy();
        this.title.destroy();
        this.historyList.destroy();

        this.background = null;
        this.backButton = null;
        this.title = null;
        this.historyList = null;

        super.destroy();
    }
}