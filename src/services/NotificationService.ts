import {Sprite} from "pixi.js";
import {DialogPopupData} from "../domino_game/root/popups_container/dialog_popup/DialogPopupData";
import {GameEvents} from "../GameEvents";
import {CurrencyConverter} from "../utils/CurrencyConverter";
import {DepositSuccessContent} from "./notification_service/DepositSuccessContent";
import {TonPurchasedData} from "./socket_service/socket_message_data/TonPurchasedData";


export class NotificationService {
    static showDepositSuccess(txData: TonPurchasedData) {
        const data: DialogPopupData = {
            resolve: () => dispatchEvent(new MessageEvent(GameEvents.CLOSE_DIALOG_POPUP)),
            titleText: "Success!",
            content: new DepositSuccessContent(txData.nanotons),
            yesText: "Ok",
            okButtonOnly: true,
            noText: "",
        };
        dispatchEvent(new MessageEvent(GameEvents.OPEN_DIALOG_POPUP, {data}));
    }

    static showNoTxFound() {
        dispatchEvent(new MessageEvent(GameEvents.OPEN_INFO_POPUP, {data: {titleText: "Result", infoText: "New transactions not found"}}));
    }

}