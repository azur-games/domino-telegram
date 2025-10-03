import {RoomsTabNames} from "../domino_game/root/screens/lobby_screen/lobby_rooms/rooms_header/RoomsTabs";
import {GameEvents} from "../GameEvents";


export type FilterLobbyRoomsPayload = {
    isSitNow: boolean;
    activeTab: RoomsTabNames
}

export class FilterLobbyRooms extends CustomEvent<FilterLobbyRoomsPayload> {
    constructor(detail: FilterLobbyRoomsPayload) {
        super(GameEvents.FILTER_LOBBY_ROOMS, {detail});
    }
}