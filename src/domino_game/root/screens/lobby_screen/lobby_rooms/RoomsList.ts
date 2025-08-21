import {Point} from "pixi.js";
import {ScrollContainer} from "@azur-games/pixi-vip-framework";
import {DynamicData} from "../../../../../DynamicData";
import {FilterLobbyRooms, FilterLobbyRoomsPayload} from "../../../../../game_events/FilterLobbyRooms";
import {GameEvents} from "../../../../../GameEvents";
import {SocketGameConfig} from "../../../../../services/socket_service/socket_message_data/SocketGameConfig";
import {StaticData} from "../../../../../StaticData";
import {RoomsListItem} from "./rooms_list/RoomsListItem";


export class RoomsList extends ScrollContainer<RoomsListItem> {
    static isThisRoomAvailable(room: SocketGameConfig): boolean {
        return room.minLevel <= DynamicData.myProfile.level && room.minBalanceCoins <= DynamicData.myProfile.coins;
    }

    private onRoomsFilterBindThis: (e: FilterLobbyRooms) => void;

    constructor() {
        super({
            maskSizes: new Point(960, 1900),
            maskPosition: new Point(0, 950),
            marginBetweenItems: 210,
            bottomMargin: 40
        });
        this.onRoomsFilterBindThis = this.onRoomsFilter.bind(this);
        addEventListener(GameEvents.FILTER_LOBBY_ROOMS, this.onRoomsFilterBindThis);
        this.createRooms(StaticData.gamesConfig);
    }

    onRoomsFilter(e: FilterLobbyRooms): void {
        const {isSitNow, gameType}: FilterLobbyRoomsPayload = e.detail;

        let filteredRooms: SocketGameConfig[] = !!gameType
            ? StaticData.gamesConfig.filter((room) => room.gameType === gameType)
            : StaticData.gamesConfig;

        if (isSitNow) {
            filteredRooms = filteredRooms.filter(RoomsList.isThisRoomAvailable);
        }

        this.createRooms(filteredRooms);
        this.scrollToTop();
    }

    createRooms(roomsConfig: SocketGameConfig[]): void {
        this.createList(roomsConfig.map(data => new RoomsListItem(data, RoomsList.isThisRoomAvailable(data))), 90);
        this.list.scrollable = false;
    }

    destroy(): void {
        removeEventListener(GameEvents.FILTER_LOBBY_ROOMS, this.onRoomsFilterBindThis);
        this.onRoomsFilterBindThis = null;
        super.destroy();
    }
} 