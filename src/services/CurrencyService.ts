import {LocalStorageService} from "../../../pixi-vip-framework/src";
import {GameEvents} from "../GameEvents";
import {LocalStorageNames} from "../LocalStorageNames";
import {SocketGameConfig} from "./socket_service/socket_message_data/SocketGameConfig";


export enum Currency {
    HARD = "hard",
    SOFT = "soft",
}

export class CurrencyService {
    private static _currency: Currency;
    static get currency(): Currency {
        return CurrencyService._currency;
    };

    static set currency(currency: Currency) {
        LocalStorageService.setKeyValue(LocalStorageNames.CURRENCY, currency);
        CurrencyService._currency = currency;
        dispatchEvent(new MessageEvent(GameEvents.CURRENCY_CHANGED, {data: currency}));
    };

    static get currencyIcon(): string {
        return "common/currency_" + (CurrencyService.isHardModeNow ? "hard" : "soft");
    }

    static get isSoftModeNow(): boolean {
        return CurrencyService.currency === Currency.SOFT;
    };

    static get isHardModeNow(): boolean {
        return CurrencyService.currency === Currency.HARD;
    };

    static async init() {
        CurrencyService.currency = await LocalStorageService.initValue(LocalStorageNames.CURRENCY, Currency.SOFT);
    }

    static isThisHardCurrencyRoom(room: SocketGameConfig): boolean {
        return room.gameType.includes("hard");
    }

    static isThisSoftCurrencyRoom(room: SocketGameConfig): boolean {
        return room.gameType.includes("soft");
    }
}