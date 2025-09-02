import {TxData} from "@azur-games/pixi-vip-framework";
import {DialogPopupData} from "../domino_game/root/popups_container/dialog_popup/DialogPopupData";
import {GameEvents} from "../GameEvents";
import {DepositSuccessContent} from "./notification_service/DepositSuccessContent";


export class NotificationService {
    static showDepositSuccess(txData: TxData) {
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

    static showWithdrawSubmitted() {
        dispatchEvent(new MessageEvent(GameEvents.OPEN_INFO_POPUP, {data: {titleText: "Result", infoText: "Withdraw request is submitted"}}));
    }

}