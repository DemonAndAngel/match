
import { _decorator, Component, Node, Vec4, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact, input, Input, __private, KeyCode } from 'cc';
import { AttackType } from './AttackType';
import { Key, KeyType, NewKey } from './Key';
import { PlayerType } from './PlayerType';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerController
 * DateTime = Thu Feb 24 2022 18:34:59 GMT+0800 (中国标准时间)
 * Author = aa568089002
 * FileBasename = PlayerController.ts
 * FileBasenameNoExtension = PlayerController
 * URL = db://assets/scripts/PlayerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('PlayerController')
export class PlayerController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    state = {
        status: PlayerType.None,
        key: {
            // W: NewKey(),
            // S: NewKey(),
            // A: NewKey(),
            // D: NewKey(),
            // J: NewKey(),
            // K: NewKey(),
            // L: NewKey(),
            // U: NewKey(),
            // I: NewKey(),
        },
        move: {
            ani: false,
            v: new Vec4()
        },
        attack: {
            status: AttackType.None, // 攻击状态; NONE: 没有; F: 第一
            time: new Date, // 状态触发时间
            interval: 380, // ms
            timeOutInterval: 880, // ms
            timer: 0, // 进入下一动作定时器
            timeOutTimer: 0, // 超时定时器
        }
    }
    // 初始化按键
    initKey() {
        this.state.key[KeyCode.KEY_W] = NewKey()
        this.state.key[KeyCode.KEY_S] = NewKey()
        this.state.key[KeyCode.KEY_A] = NewKey()
        this.state.key[KeyCode.KEY_D] = NewKey()
        this.state.key[KeyCode.KEY_J] = NewKey()
        this.state.key[KeyCode.KEY_K] = NewKey()
        this.state.key[KeyCode.KEY_L] = NewKey()
        this.state.key[KeyCode.KEY_U] = NewKey()
        this.state.key[KeyCode.KEY_I] = NewKey()
        this.state.key[KeyCode.KEY_O] = NewKey()
    }

    start () {
        this.initKey()
        // 添加监听
        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        // 按键
        input.on(Input.EventType.KEY_DOWN, this.keyDown, this)
        input.on(Input.EventType.KEY_UP, this.keyUp, this)
    }
    keyDown(event: any) {
        console.log(this.state.key)
        if (this.state.key[event.keyCode]) {
            this.state.key[event.keyCode].setDown()
        }
    }
    keyUp(event: any) {
        console.log(this.state.key)
        if (this.state.key[event.keyCode]) {
            this.state.key[event.keyCode].setUp()
        }
    }
    onBeginContact(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact')
    }
    onEndContact(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact')
    }
    onPreSolve(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        console.log('onPreSolve')
    }
    onPostSolve(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        console.log('onPostSolve');
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
