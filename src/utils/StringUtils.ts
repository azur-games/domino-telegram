import {StringUtils as StringUtilsCore} from "@azur-games/pixi-vip-framework";


export class StringUtils extends StringUtilsCore {
    static truncAddress(address: string) {
        return address.length > 30
            ? `${address.substring(0, 15)}${address.substring(address.length - 15)}`
            : address;
    };
}
