import {Button} from "@azur-games/pixi-vip-framework";
import {Point} from "pixi.js";
import {NotificationService} from "../../../../../../../services/NotificationService";
import {SocketService} from "../../../../../../../services/SocketService";


export class CheckTxButton extends Button {
    private intervalId: number;
    private fetchDelaySec: number = 60;
    private currentDelaySec: number;

    constructor() {
        super({
            bgTextureName: "deposit/check_tx_bg",
            bgSizes: new Point(465, 94),
            bgCornersSize: 34,
            textKey: "Check TX",
            fontSize: 40,
            fontWeight: "400",
            textPosition: new Point(40, -4),
            iconTextureName: "deposit/renew_icon",
            iconPosition: new Point(-100, -4)
        });
    }

    async processClick() {
        let result = await SocketService.tonFetch();
        if (result.length) {
            NotificationService.showDepositSuccess(result[0]);
        } else {
            NotificationService.showNoTxFound();
        }
        this.startTimer();
    }

    private startTimer() {
        this.currentDelaySec = 0;
        this.update();
        this.intervalId = window.setInterval(() => this.update(), 1000);
    }

    update(): void {
        let time: number = Math.max(0, this.fetchDelaySec - this.currentDelaySec);
        this.currentDelaySec++;
        if (time) {
            this.languageText.changeText(time.toString() + "s");
            this.changeIcon("deposit/time_icon");
            this.enabled = false;
            this.backgroundImage.alpha = .4;
            this.languageText.x = 20;
            this.icon.x = -60;
        } else {
            window.clearInterval(this.intervalId);
            this.languageText.changeText("Check TX");
            this.changeIcon("deposit/renew_icon");
            this.enabled = true;
            this.languageText.x = 40;
            this.icon.x = -100;
            this.backgroundImage.alpha = 1;
        }
    }

    destroy(): void {
        window.clearInterval(this.intervalId);

        super.destroy();
    }
}
