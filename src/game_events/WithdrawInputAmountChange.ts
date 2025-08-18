import {GameEvents} from "../GameEvents";


export type WithdrawInputAmountChangePayload = {
    amount: string;
}

export class WithdrawInputAmountChange extends CustomEvent<WithdrawInputAmountChangePayload> {
    constructor(detail: WithdrawInputAmountChangePayload) {
        super(GameEvents.WITHDRAW_INPUT_AMOUNT_CHANGE, {detail});
    }
}