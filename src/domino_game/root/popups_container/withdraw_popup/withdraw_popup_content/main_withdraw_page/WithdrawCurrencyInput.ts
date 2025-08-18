import {DisplayObjectFactory, Pivot, LanguageText, TonRates, NumberUtils} from "@azur-games/pixi-vip-framework";
import {TextInput} from "pixi-textinput-v5";
import {NineSlicePlane, Sprite, Text} from "pixi.js";
import {DynamicData} from "../../../../../../DynamicData";
import {WithdrawInputAmountChange} from "../../../../../../game_events/WithdrawInputAmountChange";
import {Settings} from "../../../../../../Settings";
import {CurrencyConverter} from "../../../../../../utils/CurrencyConverter";
import {MaxWithdrawBlock} from "./MaxWithdrawBlock";


export class WithdrawCurrencyInput extends Sprite {
    private maxDigitsLength: number = 5;
    private maxDecimalLength: number = 2;
    private background: NineSlicePlane;
    private dollarSign: LanguageText;
    private input: TextInput;
    private minAmountText: LanguageText;
    private maxWithdrawBlock: MaxWithdrawBlock;
    private maxAmount: number;
    private minAmount: number;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
        //@ts-ignore
        this.input.htmlInput.style.visibility = 'visible';
    }

    createChildren(): void {
        this.background = DisplayObjectFactory.createNineSlicePlane("deposit/qr_bg", 30, 30, 30, 30);
        this.dollarSign = new LanguageText({key: "$", fontWeight: "500", fontSize: 40});
        this.input = new TextInput({
            multiline: false,
            input: {
                multiline: false,
                fontSize: "40px",
                fontFamily: Settings.COMMISSIONER,
                fontWeight: "600",
                padding: "40px",
                width: "600px",
                color: "#ffffff",
                height: "0px",
                textAlign: "left",
                rows: 1
            },
        });
        this.input.on("input", this.tryToInput.bind(this), this);
        //@ts-ignore
        this.input.htmlInput.style.visibility = 'hidden';

        this.minAmountText = new LanguageText({
            key: "",
            fontSize: 32,
            fontWeight: "400",
            fill: 0x475F9B
        });

        this.maxWithdrawBlock = new MaxWithdrawBlock(this.onMaxClick.bind(this));
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.dollarSign);
        this.addChild(this.input);
        this.addChild(this.minAmountText);
        this.addChild(this.maxWithdrawBlock);
    }

    initChildren(): void {
        //@ts-ignore
        // this.input.placeholder = "0.0";
        // this.input._placeholderColor = 0x38508C;
        this.input.focus();

        this.background.width = 960;
        this.background.height = 148;

        Pivot.center(this.background);
        Pivot.center(this.dollarSign, false);
        Pivot.center(this.input);
        Pivot.center(this.minAmountText, false);

        this.dollarSign.x = -450;
        this.input.x = -110;
        this.input.y = this.dollarSign.y = -20;
        this.minAmountText.x = -450;
        this.minAmountText.y = 32;
        this.maxWithdrawBlock.x = 330;
    }

    onMaxClick(): void {
        //@ts-ignore
        this.input.text = this.maxAmount.toString();
        this.tryToInput(this.maxAmount.toString());
    }

    tryToInput(value: string): void {
        let cleanValue = value.replace(/[^\d+\.?\d*$]/, '');
        const cleanValueNumber = parseFloat(cleanValue);
        const [digits, decimals] = cleanValue.split(".");
        if (digits?.length > this.maxDigitsLength || decimals?.length > this.maxDecimalLength) {
            cleanValue = cleanValue.substring(0, cleanValue.length - 1);
            let inputText = this.input.children.find(child => child instanceof Text) as Text;
            //@ts-ignore
            this.input.text = inputText.text.substr(0, value.length - 1);
        }
        //@ts-ignore
        this.input.text = cleanValue;
        if (isNaN(cleanValueNumber) || cleanValueNumber > this.maxAmount || this.minAmount > cleanValueNumber) {
            dispatchEvent(new WithdrawInputAmountChange({amount: ""}));
            return;
        }

        const coins = Math.trunc(parseFloat(cleanValue) * DynamicData.tonRates.outUsdtToCoin);
        dispatchEvent(new WithdrawInputAmountChange({amount: coins.toString()}));
    }

    applyData(rates: TonRates) {
        this.maxAmount = parseFloat(CurrencyConverter.coinsToUSD(DynamicData.myProfile.coins));
        this.minAmount = rates.minTransactionUsd;
        this.maxWithdrawBlock.updateMaxAmount(this.maxAmount);
        this.minAmountText.changeText("Min amount: $" + NumberUtils.shortPriceFormat(rates.minTransactionUsd, 2), false);
    }

    destroy(): void {

        this.removeChild(this.dollarSign);
        this.removeChild(this.background);
        this.removeChild(this.input);
        this.removeChild(this.minAmountText);
        this.removeChild(this.maxWithdrawBlock);

        this.dollarSign.destroy();
        this.background.destroy();
        this.input.destroy();
        this.minAmountText.destroy();
        this.maxWithdrawBlock.destroy();

        this.dollarSign = null;
        this.background = null;
        this.input = null;
        this.minAmountText = null;
        this.maxWithdrawBlock = null;

        super.destroy();
    }
}