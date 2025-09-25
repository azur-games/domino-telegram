import {Sprite} from "pixi.js";
import {LanguageText} from "@azur-games/pixi-vip-framework";
import {DynamicData} from "../../../../DynamicData";
import {LanguageService} from "@azur-games/pixi-vip-framework";
import {GameMode} from "../../../../services/socket_service/socket_message_data/socket_game_config/GameMode";
import {SocketGameConfig} from "../../../../services/socket_service/socket_message_data/SocketGameConfig";
import {StaticData} from "../../../../StaticData";
import {Pivot} from "@azur-games/pixi-vip-framework";
import {Spinner} from "./table_loader/Spinner";


export class TableLoader extends Sprite {
    private spinner: Spinner;
    private lookingForPlayersText: LanguageText;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.initChildren();
    }

    createChildren(): void {
        this.spinner = new Spinner();
        this.lookingForPlayersText = new LanguageText({key: "We are looking for players", fontSize: 35, fontWeight: "600"});
    }

    addChildren(): void {
        this.addChild(this.spinner);
        this.addChild(this.lookingForPlayersText);
    }

    initChildren(): void {
        this.spinner.scale.set(.8);
        this.lookingForPlayersText.alpha = .41;

        Pivot.center(this.lookingForPlayersText);

        this.spinner.y = -70;
        this.lookingForPlayersText.y = 70;
    }

    destroy(): void {
        super.destroy();
    }
}
