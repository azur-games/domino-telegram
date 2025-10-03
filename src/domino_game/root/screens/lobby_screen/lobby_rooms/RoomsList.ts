import {GameMode, ScrollContainer} from "@azur-games/pixi-vip-framework";
import {Point} from "pixi.js";
import {DynamicData} from "../../../../../DynamicData";
import {FilterLobbyRooms, FilterLobbyRoomsPayload} from "../../../../../game_events/FilterLobbyRooms";
import {GameEvents} from "../../../../../GameEvents";
import {CurrencyService} from "../../../../../services/CurrencyService";
import {ProfileData} from "../../../../../services/socket_service/socket_message_data/ProfileData";
import {SocketGameConfig} from "../../../../../services/socket_service/socket_message_data/SocketGameConfig";
import {StaticData} from "../../../../../StaticData";
import {RoomsListItem} from "./rooms_list/RoomsListItem";


export class RoomsList extends ScrollContainer<RoomsListItem> {
    static isThisRoomAvailable(room: SocketGameConfig): boolean {
        if (room.minLevel > DynamicData.myProfile.level) {
            return false;
        }

        let minBalanceKey: keyof SocketGameConfig = CurrencyService.isHardModeNow ? "minBalanceCoins" : "minBalanceSoftCoins";
        let balanceKey: keyof ProfileData = CurrencyService.isHardModeNow ? "coins" : "softCoins";
        let maxBalanceKey: keyof SocketGameConfig = CurrencyService.isHardModeNow ? "maxBalanceCoins" : "maxBalanceSoftCoins";

        return room[minBalanceKey] <= DynamicData.myProfile[balanceKey]
            && room[maxBalanceKey] >= DynamicData.myProfile[balanceKey];

    }

    private onRoomsFilterBindThis: (e: FilterLobbyRooms) => void;
    private onCurrencyChangeBindThis: () => void;

    constructor() {
        super({
            maskSizes: new Point(960, 1900),
            maskPosition: new Point(0, 950),
            marginBetweenItems: 210,
            bottomMargin: 40
        });
        this.onRoomsFilterBindThis = this.onRoomsFilter.bind(this);
        addEventListener(GameEvents.FILTER_LOBBY_ROOMS, this.onRoomsFilterBindThis);
        this.onCurrencyChangeBindThis = this.onCurrencyChange.bind(this);
        addEventListener(GameEvents.CURRENCY_CHANGED, this.onCurrencyChangeBindThis);
        let rooms = StaticData.gamesConfig.filter(this.filterRoomsByCurrency);
        this.createRooms(rooms);
    }

    onRoomsFilter(e: FilterLobbyRooms): void {
        const {isSitNow, activeTab}: FilterLobbyRoomsPayload = e.detail;

        let filteredRooms: SocketGameConfig[] = !!activeTab
            ? StaticData.gamesConfig.filter((room) => room.gameType === (CurrencyService.currency.toString() + activeTab.toString()))
            : StaticData.gamesConfig.filter((room) => (room.gameType as string).includes((CurrencyService.currency)));

        if (isSitNow) {
            filteredRooms = filteredRooms.filter(RoomsList.isThisRoomAvailable);
        }

        this.createRooms(filteredRooms);
        this.scrollToTop();
    }

    filterRoomsByCurrency(room: SocketGameConfig): boolean {
        return room.gameMode === GameMode.PRO && (CurrencyService.isSoftModeNow ? CurrencyService.isThisSoftCurrencyRoom(room) : CurrencyService.isThisHardCurrencyRoom(room));
    }

    onCurrencyChange() {
        this.createRooms(StaticData.gamesConfig.filter(this.filterRoomsByCurrency));
    }

    createRooms(roomsConfig: SocketGameConfig[]): void {
        this.createList(roomsConfig.map(data => new RoomsListItem(data, RoomsList.isThisRoomAvailable(data))), 90);
        this.list.scrollable = false;
    }

    destroy(): void {
        removeEventListener(GameEvents.FILTER_LOBBY_ROOMS, this.onRoomsFilterBindThis);
        removeEventListener(GameEvents.CURRENCY_CHANGED, this.onCurrencyChangeBindThis);
        this.onCurrencyChangeBindThis = null;
        this.onRoomsFilterBindThis = null;
        super.destroy();
    }
} 