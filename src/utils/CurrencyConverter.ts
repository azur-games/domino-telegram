import {DynamicData} from "../DynamicData";
import Big from 'big.js';


export class CurrencyConverter {
    static usdToTon(usd: number): string {
        return (usd / DynamicData.tonRates.ton2usdt).toFixed(2);
    }

    static nanotonToUSD(nanoTon: number): string {
        const nanoTonsBigJs = new Big(nanoTon);
        return nanoTonsBigJs.div(new Big(1000000000)).mul(new Big(DynamicData.tonRates.ton2usdt)).toFixed(2);
    }

    static coinsToUSD(coins: number): string {
        return (DynamicData.myProfile.coins / DynamicData.tonRates.outUsdtToCoin).toFixed(2);
    }
}