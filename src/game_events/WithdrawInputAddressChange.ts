import {GameEvents} from "../GameEvents";


export type WithdrawInputAddressChangePayload = {
    address: string;
}

export class WithdrawInputAddressChange extends CustomEvent<WithdrawInputAddressChangePayload> {
    constructor(detail: WithdrawInputAddressChangePayload) {
        super(GameEvents.WITHDRAW_INPUT_ADDRESS_CHANGE, {detail});
    }
}