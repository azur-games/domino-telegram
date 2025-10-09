import {Sprite} from "pixi.js";
import {GameEvents} from "../../GameEvents";
import {ProfileData} from "../../services/socket_service/socket_message_data/ProfileData";
import {LevelUpEventMessage} from "../../services/socket_service/socket_message_data/user_events_message/LevelUpEventMessage";
import {DialogPopupData} from "./popups_container/dialog_popup/DialogPopupData";
import {DialogPopup} from "./popups_container/DialogPopup";
import {InfoPopupData} from "./popups_container/info_popup/InfoPopupData";
import {InfoPopup} from "./popups_container/InfoPopup";
import {InputPopupData} from "./popups_container/input_popup/InputPopupData";
import {InputPopup} from "./popups_container/InputPopup";
import {LeaveGamePopup} from "./popups_container/LeaveGamePopup";
import {LevelUpPopup} from "./popups_container/LevelUpPopup";
import {MaintenancePopup} from "./popups_container/MaintenancePopup";
import {DepositPopup} from "./popups_container/DepositPopup";
import {WithdrawPopup} from "./popups_container/WithdrawPopup";
import {HistoryPopup} from "./popups_container/HistoryPopup";
import {ProfileEditPopup} from "./popups_container/ProfileEditPopup";
import {LobbyScreen} from "./screens/LobbyScreen";


export class PopupsContainer extends Sprite {
    private dialogPopup: DialogPopup;
    private leaveGamePopup: LeaveGamePopup;
    private levelUpPopup: LevelUpPopup;
    private infoPopup: InfoPopup;
    private inputPopup: InputPopup;
    private maintenancePopup: MaintenancePopup;
    private depositPopup: DepositPopup;
    private withdrawPopup: WithdrawPopup;
    private historyPopup: HistoryPopup;
    private profileEditPopup: ProfileEditPopup;

    constructor() {
        super();
        addEventListener(GameEvents.OPEN_DIALOG_POPUP, this.onOpenDialogPopup.bind(this));
        addEventListener(GameEvents.CLOSE_DIALOG_POPUP, this.onCloseDialogPopup.bind(this));
        addEventListener(GameEvents.OPEN_LEAVE_GAME_POPUP, this.onOpenLeaveGamePopup.bind(this));
        addEventListener(GameEvents.CLOSE_LEAVE_GAME_POPUP, this.onCloseLeaveGamePopup.bind(this));
        addEventListener(GameEvents.OPEN_LEVEL_UP_POPUP, this.onOpenLevelUpPopup.bind(this));
        addEventListener(GameEvents.CLOSE_LEVEL_UP_POPUP, this.onCloseLevelUpPopup.bind(this));
        addEventListener(GameEvents.OPEN_INFO_POPUP, this.onOpenInfoPopup.bind(this));
        addEventListener(GameEvents.CLOSE_INFO_POPUP, this.onCloseInfoPopup.bind(this));
        addEventListener(GameEvents.OPEN_INPUT_POPUP, this.onOpenInputPopup.bind(this));
        addEventListener(GameEvents.CLOSE_INPUT_POPUP, this.onCloseInputPopup.bind(this));
        addEventListener(GameEvents.OPEN_MAINTENANCE_POPUP, this.onOpenMaintenancePopup.bind(this));
        addEventListener(GameEvents.CLOSE_MAINTENANCE_POPUP, this.onCloseMaintenancePopup.bind(this));
        addEventListener(GameEvents.OPEN_DEPOSIT_POPUP, this.onOpenDepositPopup.bind(this));
        addEventListener(GameEvents.CLOSE_DEPOSIT_POPUP, this.onCloseDepositPopup.bind(this));
        addEventListener(GameEvents.OPEN_WITHDRAW_POPUP, this.onOpenWithdrawPopup.bind(this));
        addEventListener(GameEvents.CLOSE_WITHDRAW_POPUP, this.onCloseWithdrawPopup.bind(this));
        addEventListener(GameEvents.OPEN_HISTORY_POPUP, this.onOpenHistoryPopup.bind(this));
        addEventListener(GameEvents.CLOSE_HISTORY_POPUP, this.onCloseHistoryPopup.bind(this));
        addEventListener(GameEvents.OPEN_EDIT_PROFILE_POPUP, this.onOpenProfileEditPopup.bind(this));
        addEventListener(GameEvents.CLOSE_EDIT_PROFILE_POPUP, this.onCloseProfileEditPopup.bind(this));
        // setTimeout(() => this.onOpenProfileEditPopup(), 4000);
    }

    onOpenMaintenancePopup(): void {
        if (this.maintenancePopup) {
            return;
        }

        this.maintenancePopup = new MaintenancePopup();
        this.addChild(this.maintenancePopup);
    }

    async onCloseMaintenancePopup(): Promise<void> {
        if (!this.maintenancePopup) {
            return;
        }
        await this.maintenancePopup.show(false);
        this.removeChild(this.maintenancePopup);
        this.maintenancePopup.destroy();
        this.maintenancePopup = null;
    }

    onOpenInputPopup(e: MessageEvent): void {
        if (this.inputPopup) {
            return;
        }
        let inputPopupData: InputPopupData = e.data;
        this.inputPopup = new InputPopup(inputPopupData);
        this.addChild(this.inputPopup);
    }

    async onCloseInputPopup(): Promise<void> {
        if (!this.inputPopup) {
            return;
        }
        await this.inputPopup.show(false);
        this.removeChild(this.inputPopup);
        this.inputPopup.destroy();
        this.inputPopup = null;
    }

    onOpenInfoPopup(e: MessageEvent): void {
        if (this.infoPopup) {
            return;
        }
        let infoPopupData: InfoPopupData = e.data;
        this.infoPopup = new InfoPopup(infoPopupData);
        this.addChild(this.infoPopup);
    }

    async onCloseInfoPopup(): Promise<void> {
        if (!this.infoPopup) {
            return;
        }
        await this.infoPopup.show(false);
        this.removeChild(this.infoPopup);
        this.infoPopup.destroy();
        this.infoPopup = null;
    }

    onOpenLevelUpPopup(e: MessageEvent): void {
        if (this.levelUpPopup) {
            return;
        }
        dispatchEvent(new MessageEvent(GameEvents.SET_SCREEN_BLUR));
        let levelUpMessageData: LevelUpEventMessage = e.data;
        this.levelUpPopup = new LevelUpPopup(levelUpMessageData);
        this.addChild(this.levelUpPopup);
    }

    async onCloseLevelUpPopup(): Promise<void> {
        if (!this.levelUpPopup) {
            return;
        }
        dispatchEvent(new MessageEvent(GameEvents.CLEAR_SCREEN_BLUR));
        await this.levelUpPopup.show(false);
        this.removeChild(this.levelUpPopup);
        this.levelUpPopup.destroy();
        this.levelUpPopup = null;
    }

    onOpenLeaveGamePopup(): void {
        if (this.leaveGamePopup) {
            return;
        }
        this.leaveGamePopup = new LeaveGamePopup();
        this.addChild(this.leaveGamePopup);
    }

    async onCloseLeaveGamePopup(): Promise<void> {
        if (!this.leaveGamePopup) {
            return;
        }
        await this.leaveGamePopup.show(false);
        this.removeChild(this.leaveGamePopup);
        this.leaveGamePopup.destroy();
        this.leaveGamePopup = null;
    }

    onOpenDialogPopup(e: MessageEvent): void {
        if (this.dialogPopup) {
            return;
        }

        let data: DialogPopupData = e.data;
        this.dialogPopup = new DialogPopup(data);
        this.addChild(this.dialogPopup);
    }

    async onCloseDialogPopup(): Promise<void> {
        if (!this.dialogPopup) {
            return;
        }
        await this.dialogPopup.show(false);
        this.removeChild(this.dialogPopup);
        this.dialogPopup.destroy();
        this.dialogPopup = null;
    }

    onOpenDepositPopup(): void {
        if (this.depositPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = false;
        this.depositPopup = new DepositPopup();
        this.addChild(this.depositPopup);
    }

    async onCloseDepositPopup(): Promise<void> {
        if (!this.depositPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = true;
        await this.depositPopup.show(false);
        this.removeChild(this.depositPopup);
        this.depositPopup.destroy();
        this.depositPopup = null;
    }

    onOpenWithdrawPopup(): void {
        if (this.withdrawPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = false;
        this.withdrawPopup = new WithdrawPopup();
        this.addChild(this.withdrawPopup);
    }

    async onCloseWithdrawPopup(): Promise<void> {
        if (!this.withdrawPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = true;
        await this.withdrawPopup.show(false);
        this.removeChild(this.withdrawPopup);
        this.withdrawPopup.destroy();
        this.withdrawPopup = null;
    }

    onOpenHistoryPopup(): void {
        if (this.historyPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = false;
        this.historyPopup = new HistoryPopup();
        this.addChild(this.historyPopup);
    }

    async onCloseHistoryPopup(): Promise<void> {
        if (!this.historyPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = true;
        await this.historyPopup.show(false);
        this.removeChild(this.historyPopup);
        this.historyPopup.destroy();
        this.historyPopup = null;
    }

    onOpenProfileEditPopup(): void {
        if (this.profileEditPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = false;
        this.profileEditPopup = new ProfileEditPopup();
        this.addChild(this.profileEditPopup);
    }

    async onCloseProfileEditPopup(): Promise<void> {
        if (!this.profileEditPopup) {
            return;
        }
        LobbyScreen.roomsListVisible = true;
        await this.profileEditPopup.show(false);
        this.removeChild(this.profileEditPopup);
        this.profileEditPopup.destroy();
        this.profileEditPopup = null;
    }

}