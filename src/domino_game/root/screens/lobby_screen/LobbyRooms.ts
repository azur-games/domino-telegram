import {Sine, Power1, Power2, TweenMax} from "gsap";
import {InteractionEvent, NineSlicePlane, Sprite} from "pixi.js";
import {Clamp, DisplayObjectFactory, DraggableObject, FrameworkEvents, IPoint, Pivot} from "@azur-games/pixi-vip-framework";
import {DominoGame} from "../../../../app";
import {LobbyScreen} from "../LobbyScreen";
import {RoomsHeader} from "./lobby_rooms/RoomsHeader";
import {RoomsList} from "./lobby_rooms/RoomsList";


export class LobbyRooms extends DraggableObject {
    private top: number = -DominoGame.instance.screenH / 2 + 840;
    private bottom: number = -DominoGame.instance.screenH / 2 + 60;
    private speed: number;
    private pointerStart: number;
    private minListHeight: number = 1131;
    private maxListHeight: number = 1700;
    private listHeight: number = this.minListHeight;
    private header: RoomsHeader;
    private roomsList: RoomsList;
    private bgGradient: NineSlicePlane;
    private background: NineSlicePlane;
    private bgContainer: Sprite;
    private magnetizeTween: TweenMax;
    private listHeightTween: TweenMax;
    private bgContainerAlphaTween: TweenMax;
    private pointerDown: boolean;
    private onMouseWheelBindThis: (e: Event) => void;

    constructor() {
        super();
        this.createChildren();
        this.addChildren();
        this.onMouseWheelBindThis = this.onWheel.bind(this);
        addEventListener(FrameworkEvents.MOUSE_WHEEL, this.onMouseWheelBindThis);
        this.bgContainer.interactive = this.bgContainer.interactiveChildren = false;
    }

    magnetizeToCoor(coor: number) {
        this.magnetizeTween?.kill();
        this.magnetizeTween = TweenMax.to(this, .3, {
            y: coor,
            ease: Power1.easeOut,
        });

        this.bgContainerAlphaTween?.kill();
        const listGoUp = coor < -130;
        this.bgContainerAlphaTween = TweenMax.to(this.bgContainer, .1, {
            alpha: listGoUp ? 1 : 0,
            y: listGoUp ? 0 : -50,
            ease: Sine.easeOut,
        });

    }

    changeListHeight(progress: number): void {
        this.listHeightTween?.kill();
        this.listHeightTween = TweenMax.to(this, .3, {
            listHeight: Clamp.between(this.minListHeight, this.minListHeight + ((this.maxListHeight - this.minListHeight) * progress), this.maxListHeight),
            ease: Power1.easeOut,
            onUpdate: () => this.roomsList.block(this.listHeight < this.maxListHeight)
        });
    }

    onPointerDown(e: InteractionEvent): void {
        this.pointerDown = true;
        this.speed = 0;
        this.pointerStart = this.y;
        super.onPointerDown(e);
    }

    tryMove(): void {
        let y: number = this.movePosition.y - this.pointerStartOffset.y;
        let newPos: IPoint = this.clampPos(0, y);
        let newY: number = newPos.y;
        this.speed = newY - this.y;
        this.scroll(newY / this.bottom);
        if (Math.abs(this.y - this.pointerStart) > 10) {
            this.dragged = true;
        }
    }

    clampPos(_x: number, y: number): IPoint {
        let clampedY = Clamp.between(this.bottom, y, this.top);
        return {x: 0, y: clampedY};
    }

    onWheel(e: MessageEvent): void {
        if (!LobbyScreen.roomsListVisible) {
            return;
        }
        let data: {wheelDelta: IPoint} = e.data;
        let progress: number = data.wheelDelta.y / Math.abs(data.wheelDelta.y) * 100;
        let clampedPosition: number = Clamp.between(this.bottom, this.y - progress, this.top);
        this.scroll(clampedPosition / this.bottom);
    }

    onPointerUp(e: InteractionEvent) {
        let dragged: boolean = this.dragged;
        super.onPointerUp(e);
        if (!dragged && !this.pointerDown) {
            return;
        }
        this.dragged = false;
        this.pointerDown = false;
        this.scroll(Clamp.between(this.bottom, this.y + this.speed * 10, this.top) / this.bottom);
    }

    scroll(scrollPosition: number): void {
        this.changeListHeight(scrollPosition);
        if (this.roomsList.listPosition.y < 0) {
            this.roomsList.block(false);
            return;
        }
        let position: number = scrollPosition * this.bottom;
        this.magnetizeToCoor(position);
    }

    createChildren(): void {
        this.header = new RoomsHeader();
        this.roomsList = new RoomsList();
        this.bgGradient = DisplayObjectFactory.createNineSlicePlane("lobby/rooms_header_gradient", 2, 2, 2, 50);
        this.background = DisplayObjectFactory.createNineSlicePlane("lobby/rooms_list_bg", 20, 50, 20, 20);
        this.bgContainer = new Sprite();
    }

    addChildren(): void {
        this.addChild(this.bgContainer).alpha = 0;
        this.bgContainer.addChild(this.background);
        this.bgContainer.addChild(this.bgGradient);
        this.addChild(this.header);
        this.addChild(this.roomsList);
    }

    resize(): void {
        this.bgGradient.width = DominoGame.instance.screenW;
        this.bgGradient.height = 300;
        this.background.width = DominoGame.instance.screenW;
        this.background.height = this.listHeight + 90;

        Pivot.center(this.bgGradient);
        Pivot.center(this.background);
        this.bgContainer.alpha = 0;
        this.bgContainer.y = -50;

        this.y = -DominoGame.instance.screenH / 2 + 840;
        this.bgGradient.y = -this.bgGradient.height / 2 - 68;
        this.background.y = this.background.height / 2 - 70;
        this.roomsList.y = 70;
    }

    destroy(): void {
        this.magnetizeTween?.kill();
        this.listHeightTween?.kill();
        this.bgContainerAlphaTween?.kill();

        this.removeChild(this.header);
        this.removeChild(this.roomsList);
        this.removeChild(this.bgGradient);
        this.removeChild(this.background);

        this.header.destroy();
        this.roomsList.destroy();
        this.bgGradient.destroy();
        this.background.destroy();

        this.header = null;
        this.roomsList = null;
        this.bgGradient = null;
        this.background = null;
        this.magnetizeTween = null;
        this.listHeightTween = null;
        this.bgContainerAlphaTween = null;

        super.destroy();
    }
} 