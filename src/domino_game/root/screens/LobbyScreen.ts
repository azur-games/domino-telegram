import {TweenMax} from "gsap";
import {DominoGame} from "../../../app";
import {GameEvents} from "../../../GameEvents";
import {BaseScreen} from "./BaseScreen";
import {LobbyBackground} from "./lobby_screen/LobbyBackground";
import {LobbyHeader} from "./lobby_screen/LobbyHeader";
import {LobbyMenu} from "./lobby_screen/LobbyMenu";
import {LobbyRooms} from "./lobby_screen/LobbyRooms";
import {LobbySettings} from "./lobby_screen/LobbySettings";
import {ScreenType} from "./ScreenType";


export class LobbyScreen extends BaseScreen {
    private background: LobbyBackground;
    private header: LobbyHeader;
    private menu: LobbyMenu;
    private rooms: LobbyRooms;
    private settings: LobbySettings;
    private settingsTween: TweenMax;
    private onShowSettingsBindThis: (e: MessageEvent) => void;

    static roomsListVisible: boolean = true;

    constructor() {
        super(ScreenType.LOBBY);
        this.createChildren();
        this.addChildren();
        this.onGameScaleChanged();
        this.onShowSettingsBindThis = this.onShowSettings.bind(this);
        addEventListener(GameEvents.SHOW_LOBBY_SETTINGS, this.onShowSettingsBindThis);
    }

    createChildren(): void {
        this.background = new LobbyBackground();
        this.header = new LobbyHeader();
        this.menu = new LobbyMenu();
        this.rooms = new LobbyRooms();
        this.settings = new LobbySettings();
    }

    addChildren(): void {
        this.addChild(this.background);
        this.addChild(this.menu);
        this.addChild(this.header);
        this.addChild(this.rooms);
        this.addChild(this.settings).y = DominoGame.instance.screenH;
    }

    onGameScaleChanged(): void {
        this.rooms.resize();
        this.header.resize();
        this.menu.y = -DominoGame.instance.screenH / 2 + 700;
    }

    onShowSettings(e: MessageEvent): void {
        const show = e.data;
        LobbyScreen.roomsListVisible = !show;
        this.settingsTween?.kill();
        this.settingsTween = TweenMax.to(this.settings, {
            duration: .4,
            y: (-DominoGame.instance.screenH / 2) + (show ? 700 : DominoGame.instance.screenH * 2)
        });
    }

    destroy(): void {
        removeEventListener(GameEvents.SHOW_LOBBY_SETTINGS, this.onShowSettingsBindThis);
        this.settingsTween?.kill();
        this.removeChild(this.background);
        this.removeChild(this.settings);
        this.removeChild(this.header);
        this.removeChild(this.rooms);

        this.background.destroy();
        this.settings.destroy();
        this.header.destroy();
        this.rooms.destroy();

        this.settingsTween = null;
        this.onShowSettingsBindThis = null;
        this.background = null;
        this.settings = null;
        this.header = null;
        this.rooms = null;
        super.destroy();
    }

}