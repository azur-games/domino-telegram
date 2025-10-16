import {TxData} from "@azur-games/pixi-vip-framework";
import {DialogPopupData} from "../domino_game/root/popups_container/dialog_popup/DialogPopupData";
import {GameEvents} from "../GameEvents";
import {DepositSuccessContent} from "./notification_service/DepositSuccessContent";
import {WalletInfoContent} from "./notification_service/WalletInfoContent";


export class NotificationService {
    static showDepositSuccess(txData: TxData) {
        const data: DialogPopupData = {
            resolve: () => dispatchEvent(new MessageEvent(GameEvents.CLOSE_DIALOG_POPUP)),
            titleText: "Notification.Success",
            content: new DepositSuccessContent(txData.nanotons),
            yesText: "Notification.Ok",
            okButtonOnly: true,
            noText: "",
        };
        dispatchEvent(new MessageEvent(GameEvents.OPEN_DIALOG_POPUP, {data}));
    }

    static showNoTxFound() {
        dispatchEvent(new MessageEvent(GameEvents.OPEN_INFO_POPUP, {data: {titleText: "Notification.Result", infoText: "Notification.NoTxFound.Description"}}));
    }

    static showWithdrawSubmitted() {
        dispatchEvent(new MessageEvent(GameEvents.OPEN_INFO_POPUP, {data: {titleText: "Notification.Result", infoText: "Notification.WithdrawSubmitted.Description"}}));
    }

    static showWalletInfo(walletName: string, address: string) {
        const data: DialogPopupData = {
            resolve: () => dispatchEvent(new MessageEvent(GameEvents.CLOSE_DIALOG_POPUP)),
            titleText: "Notification.ConnectedWallet",
            content: new WalletInfoContent(walletName, address),
            yesText: "Notification.OK",
            okButtonOnly: true,
            noText: "",
        };
        dispatchEvent(new MessageEvent(GameEvents.OPEN_DIALOG_POPUP, {data}));
    }

}