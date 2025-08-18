import {GameEvents} from "../GameEvents";
import {CurrencyConverter} from "../utils/CurrencyConverter";
import {TonPurchasedData} from "./socket_service/socket_message_data/TonPurchasedData";


export class NotificationService {
    static showDepositSuccess(data: TonPurchasedData) {
        dispatchEvent(new MessageEvent(GameEvents.OPEN_INFO_POPUP, {data: {titleText: "Success", infoText: "You have received a $" + CurrencyConverter.nanotonToUSD(parseInt(data.nanotons))}}));
    }

    static showNoTxFound() {
        dispatchEvent(new MessageEvent(GameEvents.OPEN_INFO_POPUP, {data: {titleText: "", infoText: "New transactions not found"}}));
    }

}