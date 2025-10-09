import {FrameworkEvents} from "@azur-games/pixi-vip-framework";


export class GameEvents extends FrameworkEvents {
    static GAME_STATE_UPDATE: string = "GAME_STATE_UPDATE";
    static OPEN_PROFILE_POPUP: string = "OPEN_PROFILE_POPUP";
    static OPEN_EDIT_PROFILE_POPUP: string = "OPEN_EDIT_NAME_POPUP";
    static CLOSE_EDIT_PROFILE_POPUP: string = "CLOSE_EDIT_NAME_POPUP";
    static ON_FRIENDS_CHANGE: string = "ON_FRIENDS_CHANGE";
    static PROFILE_UPDATED: string = "PROFILE_UPDATED";
    static DOMINO_PLAYED: string = "DOMINO_PLAYED";
    static DOMINO_PLACE_CHANGED: string = "DOMINO_PLACE_CHANGED";
    static WHEEL_UPDATED: string = "GameEvents.WHEEL_UPDATED";
    static DOMINO_FROM_BAZAR: string = "DOMINO_FROM_BAZAR";
    static HIDE_END_ROUND_POPUP: string = "HIDE_END_ROUND_POPUP";
    static DOMINO_CLICKED: string = "DOMINO_CLICKED";
    static USER_MESSAGES_STATUSES_CHANGED: "USER_MESSAGES_STATUSES_CHANGED";
    static ON_CHAT_MESSAGE: string = "ON_CHAT_MESSAGE";
    static CHOOSE_AVATAR: string = "CHOOSE_AVATAR";
    static TARGET_REACHED: string = "TARGET_REACHED";
    static SPINNER: string = "SPINNER";
    static DOMINO: string = "DOMINO";
    static FLY_POINTS: string = "FLY_POINTS";
    static ON_CLAIM_COINS: string = "ON_CLAIM_COINS";
    static OPEN_LEAVE_GAME_POPUP: string = "OPEN_LEAVE_GAME_POPUP";
    static CLOSE_LEAVE_GAME_POPUP: string = "CLOSE_LEAVE_GAME_POPUP";
    static OPEN_LEVEL_UP_POPUP: string = "OPEN_LEVEL_UP_POPUP";
    static CLOSE_LEVEL_UP_POPUP: string = "CLOSE_LEVEL_UP_POPUP";
    static OPEN_TUTORIAL_POPUP: string = "OPEN_TUTORIAL_POPUP";
    static OPEN_GIFTS_PANEL: string = "OPEN_GIFTS_PANEL";
    static CLOSE_GIFTS_PANEL: string = "CLOSE_GIFTS_PANEL";
    static SITS_RESIZED: string = "SITS_RESIZED";
    static BAZAR_ICON_RESIZED: string = "BAZAR_ICON_RESIZED";
    static DOMINO_DRAGGING: string = "DOMINO_DRAGGING";
    static DOMINO_POINTERDOWN: string = "DOMINO_POINTERDOWN";
    static DRAG_OVER_HAND: string = "DRAG_OVER_HAND";
    static DRAG_OVER_TABLE: string = "DRAG_OVER_TABLE";
    static LOBBY_SELECT_GAME_MODE: string = "LOBBY_SELECT_GAME_MODE";
    static OPPONENT_FOUND: string = "OPPONENT_FOUND";
    static CLOSE_MENU_AND_BAZAR: string = "CLOSE_MENU_AND_BAZAR";
    static CLOSE_TABLE_CHAT: string = "CLOSE_TABLE_CHAT";
    static SPECTATING: string = "SPECTATING";
    static OPEN_INPUT_POPUP: string = "OPEN_INPUT_POPUP";
    static CLOSE_INPUT_POPUP: string = "CLOSE_INPUT_POPUP";
    static OPEN_DEPOSIT_POPUP: string = "OPEN_DEPOSIT_POPUP";
    static CLOSE_DEPOSIT_POPUP: string = "CLOSE_DEPOSIT_POPUP";
    static OPEN_WITHDRAW_POPUP: string = "OPEN_WITHDRAW_POPUP";
    static CLOSE_WITHDRAW_POPUP: string = "CLOSE_WITHDRAW_POPUP";
    static FILTER_LOBBY_ROOMS: string = "FILTER_LOBBY_ROOMS";
    static LOBBY_ROOMS_TAB_CLICKED: string = "LOBBY_ROOMS_TAB_CLICKED";
    static DEPOSIT_CURRENCY_CHOSEN: string = "DEPOSIT_CURRENCY_CHOSEN";
    static WITHDRAW_INPUT_AMOUNT_CHANGE: string = "WITHDRAW_INPUT_AMOUNT_CHANGE";
    static WITHDRAW_INPUT_ADDRESS_CHANGE: string = "WITHDRAW_INPUT_ADDRESS_CHANGE";
    static OPEN_HISTORY_POPUP: string = "OPEN_HISTORY_POPUP";
    static CLOSE_HISTORY_POPUP: string = "CLOSE_HISTORY_POPUP";
    static SHOW_LOBBY_SETTINGS: string = "SHOW_LOBBY_SETTINGS";
    static CURRENCY_CHANGED: string = "CURRENCY_CHANGED";
}

