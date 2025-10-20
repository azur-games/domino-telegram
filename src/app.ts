import {DominoCalculator} from "@azur-games/pixi-domino-core";
import {Environment, Framework, FrameworkConfig, FrameworkLocalStorageNames, GameConfig, IGame, Language, LocalStorageService} from "@azur-games/pixi-vip-framework";
import {BlurFilter} from "@pixi/filter-blur";
import {Linear, TweenMax} from "gsap";
import {Application, InteractionManager, Loader, SimpleRope} from "pixi.js";
import {Camera} from "pixi3d";
import {PlatformName} from "../../pixi-domino-core/src/types/PlatformName";
import {ActiveData} from "./data/ActiveData";
import {Root} from "./domino_game/Root";
import {DominoLogic} from "./domino_game/root/screens/table_screen/DominoLogic";
import {DynamicData} from "./DynamicData";
import {GameEvents} from "./GameEvents";
import {LilGui} from "./LilGui";
import {CurrencyService} from "./services/CurrencyService";
import {LazyLoader} from "./services/loader_service/LazyLoader";
import {MetricaEvents, MetricaService} from "./services/MetricaService";
import {SentryService} from "./services/SentryService";
import {ServerService} from "./services/ServerService";
import {SocketService} from "./services/SocketService";
import {Settings} from "./Settings";
import {Settings3D} from "./utils/Settings3D";


export class DominoGame implements IGame {
    private isPortraitMode: boolean = true;
    app: Application;
    appDiv: HTMLElement;
    private progressDiv: HTMLElement;
    private _progressDivBackgroundPosition: number = 0;
    progressTween: TweenMax;
    private persentsText: HTMLElement;
    root: Root;

    width: number;
    height: number;
    scale: number;
    screenW: number;
    screenH: number;
    scale3D: number;
    private rope: SimpleRope;

    public static instance: DominoGame;

    constructor() {
        DominoGame.instance = this;
        addEventListener(GameEvents.ON_LOADER_PROGRESS, (e: MessageEvent) => this.onProgress(e.data));
        this.progressDiv = document.getElementById("bar");
        this.persentsText = document.getElementById("bar_percents");
        DominoGame.instance.progressTween = TweenMax.to(this, 1000, {
            progressDivBackgroundPosition: 100000,
            repeat: -1,
            ease: Linear.easeNone
        });
        this.init();
    }

    switchToPortraitMode(isPortrait: boolean): void {
        DominoGame.instance.isPortraitMode = isPortrait;
        DominoGame.instance.onWindowResize();
    }

    onWindowResize(): void {
        // let windowWidth: number = Device.info.device.type == "smartphone" ? screen.width : window.innerWidth;
        // let windowHeight: number = Device.info.device.type == "smartphone" ? screen.height : window.innerHeight;

        let windowWidth = Math.max(window.innerWidth, 0.01);
        let windowHeight = Math.max(window.innerHeight, 0.01);
        let transform = `rotate(${DominoGame.instance.isPortraitMode ? "0" : "90"}deg)`;
        document.documentElement.style.setProperty('transform', transform);

        let ratio: number = Settings.RESOURCES_RATIO;

        let availableWidth: number;
        let availableHeight: number;

        if (DominoGame.instance.isPortraitMode) {
            availableWidth = windowWidth;
            availableHeight = windowHeight;
        } else {

            availableWidth = windowHeight;
            availableHeight = windowWidth;
        }

        document.documentElement.style.setProperty('--vh', `${availableHeight * 0.01}px`);
        document.documentElement.style.setProperty('--vw', `${availableWidth * 0.01}px`);
        let w: number;
        let h: number;
        let currentRatio: number = availableWidth / availableHeight;
        let moreThanRatio: boolean = currentRatio > ratio;
        if (moreThanRatio) {
            w = availableHeight * ratio;
            h = availableHeight;
        } else {
            w = availableWidth;
            h = availableWidth / ratio;
        }

        Camera.main.aspect = 1 / Settings3D.cosCorner * currentRatio;

        DominoGame.instance.width = availableWidth;
        DominoGame.instance.height = availableHeight;
        DominoGame.instance.scale = w / Settings.RESOURCES_WIDTH;
        DominoGame.instance.screenW = availableWidth / DominoGame.instance.scale;
        DominoGame.instance.screenH = availableHeight / DominoGame.instance.scale;
        // No Backginstance.round flickering on resize
        DominoGame.instance.app.renderer.resize(DominoGame.instance.width, DominoGame.instance.height);

        if (DominoGame.instance.root) {
            DominoGame.instance.root.x = DominoGame.instance.width / 2;//Math.floor((DominoGame.width - w) * .5);
            DominoGame.instance.root.y = DominoGame.instance.height / 2;//Math.floor((DominoGame.height - h) * .5);
            DominoGame.instance.root.scale.set(DominoGame.instance.scale);
            DominoGame.instance.root.resize();
            DominoGame.instance.scale3D = moreThanRatio ? 1 : DominoGame.instance.scale / (DominoGame.instance.height / Settings.RESOURCES_HEIGHT);
            DominoGame.instance.scale3D = DominoGame.instance.scale3D / 1.5;
            dispatchEvent(new MessageEvent(GameEvents.GAME_SCALE_CHANGED, {data: null}));
        }
    }

    overridePointerCoordinates(point: any, x: any, y: any): void {
        if (DominoGame.instance.isPortraitMode) {
            point.x = x;
            point.y = y;
        } else {
            point.y = DominoGame.instance.height - x;
            point.x = y;
        }
    };

    private appCreate(): void {
        console.log("version 0.0.67");
        SentryService.init();
        DominoGame.instance.app = new Application({
            autoDensity: true,
            //backgroundColor: 0x0,
            // res
            antialias: true,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1
        });
        DominoGame.instance.app.view.style.display = "block";
        Camera.main.orthographic = true;
        Camera.main.orthographicSize = 15;
        InteractionManager.prototype.mapPositionToPoint = DominoGame.instance.overridePointerCoordinates;
        window.addEventListener("resize", DominoGame.instance.onWindowResize);
        DominoGame.instance.onWindowResize();
    }

    async init(): Promise<void> {
        MetricaService.sendEvent(MetricaEvents.APP_START);
        LocalStorageService.setKeyValue(FrameworkLocalStorageNames.CURRENT_LANGUAGE, Language.EN);
        await this.frameworkInit();

        DominoGame.instance.root = new Root();
        DominoGame.instance.appCreate();
        DominoGame.instance.app.stage.addChild(DominoGame.instance.root);

        DominoLogic.initDomino();
        DominoCalculator.init(PlatformName.TELEGRAM);
        ActiveData.init();
        SocketService.clientInit();

        await Framework.mainAuthLoop();

        await CurrencyService.init();
        await DynamicData.init();
        await DominoGame.instance.root.screens.gameSync(DynamicData.socketGameRequest);
        DominoGame.instance.hideMainPreloader();
        GameConfig.environment == Environment.DEV && LilGui.init();
        LazyLoader.loadLazyResources();
        MetricaService.sendEvent(MetricaEvents.APP_LOADED);
    }

    async frameworkInit(): Promise<void> {
        let config: FrameworkConfig = JSON.parse(
            await ServerService.fetchUrlWithGetXHR(new URL("cfg/framework_config.json", window.location.origin + window.location.pathname))
        );
        config.loader = new Loader(undefined, 10);
        config.game = DominoGame.instance;
        config.blurFilter = BlurFilter;
        await Framework.init(config);
    }

    private async onProgress(progress: number): Promise<void> {
        if (!this.progressDiv) {
            return;
        }
        let persents: string = Math.ceil(20 + (progress * .8)) + "%";// см. index.html "progressDiv.style.width"
        // @ts-ignore
        window.preloaderPersents = persents;
        this.progressDiv.style.width = persents;
        this.persentsText.innerText = persents;
        // @ts-ignore
        if (window["FBInstant"] != undefined) {
            // @ts-ignore
            FBInstant.setLoadingProgress(Math.floor(progress));
        }
    }

    hideMainPreloader(): void {
        DominoGame.instance.progressTween?.kill();
        DominoGame.instance.progressTween = null;

        let preloader: HTMLElement = document.getElementById("preloader");
        let wrapper: HTMLElement = document.getElementById("wrapper");
        if (!preloader) {
            return;
        }
        wrapper.removeChild(preloader);
        DominoGame.instance.appDiv = document.getElementById("app");
        DominoGame.instance.appDiv.appendChild(DominoGame.instance.app.view);
        window.addEventListener("resize", DominoGame.instance.onWindowResize);
    }

    set progressDivBackgroundPosition(value: number) {
        this._progressDivBackgroundPosition = value;
        this.progressDiv.style.backgroundPositionX = value.toFixed() + "px";
    }

    get progressDivBackgroundPosition(): number {
        return this._progressDivBackgroundPosition;
    }
}

new DominoGame();