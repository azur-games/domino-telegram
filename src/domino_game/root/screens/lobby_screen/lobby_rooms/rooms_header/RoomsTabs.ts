import {Direction, TabData, Tabs, TabsOptions} from "@azur-games/pixi-vip-framework";
import {GameEvents} from "../../../../../../GameEvents";
import {RoomsTab} from "./rooms_tabs/RoomsTab";


export enum RoomsTabNames {
    LOW = "1",
    MID = "2",
    HIGH = "3",
    VIP = "4",
}

export class RoomsTabs extends Tabs<RoomsTab, RoomsTabNames> {
    constructor() {
        let tabsConfig: TabData<RoomsTabNames>[] = [
            {titleTextKey: "Lobby.Low", name: RoomsTabNames.LOW, backgroundTextureName: "lobby/tab_green"},
            {titleTextKey: "Lobby.Mid", name: RoomsTabNames.MID, backgroundTextureName: "lobby/tab_blue"},
            {titleTextKey: "Lobby.High", name: RoomsTabNames.HIGH, backgroundTextureName: "lobby/tab_purple"},
            {titleTextKey: "Lobby.VIP", name: RoomsTabNames.VIP, backgroundTextureName: "lobby/tab_orange"},
        ];
        let options: TabsOptions = {direction: Direction.HORIZONTAL, animated: false, betweenItems: 162};
        super(tabsConfig.map(config => new RoomsTab(config, GameEvents.LOBBY_ROOMS_TAB_CLICKED)), options);
    }
}
