
import { _decorator, Component, Node, Vec4, BoxCollider2D, Contact2DType, Collider2D, resources, ImageAsset, SpriteFrame, Sprite, IPhysics2DContact, input, Input, __private, KeyCode, Vec2, Vec3, Animation } from 'cc';
import { PlayerType, AttackType, MoveType } from './PlayerType';
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

    @property
    moveSpeed: number = 100
    @property
    moveMaxY: number = 175
    @property
    moveMaxX: number = 455

    state = {
        status: PlayerType.None,
        lastStatus: PlayerType.None,
        box: {
            offset: new Vec2,
            size: new Vec2,
        },
        // key: {
        //     listenKeys: [KeyCode.KEY_W,KeyCode.KEY_S,KeyCode.KEY_A,KeyCode.KEY_D,KeyCode.KEY_J,KeyCode.KEY_K,KeyCode.KEY_L,KeyCode.KEY_U,KeyCode.KEY_I,KeyCode.KEY_O],
        //     key: []
        // },
        move: {
            v: new Vec2()
        },
        attack: {
            time: new Date(), // 状态触发时间
            interval: 100, // ms
            timeOutInterval: 300, // ms
            timer: 0, // 进入下一动作定时器
            timeOutTimer: 0, // 超时定时器
        }
    }
    // 初始化按键
    initKey() {
        // this.state.key.listenKeys.forEach((item, k)=>{
        //     this.state.key.key[item] = NewKey()
        // })
    }

    start () {
        // this.initKey()
        // 添加监听
        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.state.box.size = new Vec2(collider.size.x, collider.size.y)
        this.state.box.offset = new Vec2(collider.offset.x, collider.offset.y)
        // 按键
        input.on(Input.EventType.KEY_DOWN, this.keyDown, this)
        input.on(Input.EventType.KEY_UP, this.keyUp, this)
    }
    keyDown(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.state.move.v.y += 1
                break
            case KeyCode.KEY_S:
                this.state.move.v.y -= 1
                break
            case KeyCode.KEY_A:
                this.state.move.v.x -= 1
                break
            case KeyCode.KEY_D:
                this.state.move.v.x += 1
                break
            case KeyCode.KEY_J:
                // 静止 移动 这两种状态都需要改变
                if (this.state.status == PlayerType.None) {
                    this.setStateStatus(PlayerType.AttackFirstS)
                    this.attackFirst()
                    // 根据攻速设定定时器
                    this.setAttackTimeout(PlayerType.AttackFirstE)
                } else if (MoveType.indexOf(this.state.status) > -1) {
                    this.setStateStatus(PlayerType.AttackFirstS)
                    this.attackFirst()
                    // 根据攻速设定定时器
                    this.setAttackTimeout(PlayerType.AttackFirstE)
                } else if (this.state.status == PlayerType.AttackFirstE) {
                    // 加载下一个动作
                    this.setStateStatus(PlayerType.AttackSecondS)
                    this.attackSecond()
                    // 根据攻速设定定时器
                    this.setAttackTimeout(PlayerType.AttackSecondE)
                } else if (this.state.status == PlayerType.AttackSecondE) {
                    // 加载下一个动作
                    this.setStateStatus(PlayerType.AttackThirdS)
                    this.attackThird()
                    // 根据攻速设定定时器
                    this.setAttackTimeout(PlayerType.AttackThirdE)
                } else if (this.state.status == PlayerType.AttackThirdE) {
                    // 加载下一个动作
                    this.setStateStatus(PlayerType.AttackFourthS)
                    this.attackFourth()
                    // 根据攻速设定定时器
                    this.setAttackTimeout(PlayerType.AttackFourthE)
                }
                break
            case KeyCode.KEY_K:
                break
        }
    }
    setAttackTimeout(status: PlayerType) {
        if (this.state.attack.timeOutTimer) {
            clearTimeout(this.state.attack.timeOutTimer)       
        }
        this.state.attack.timer = setTimeout(()=>{
            // 这里进入下一状态
            this.setStateStatus(status)
            this.state.attack.timeOutTimer = setTimeout(()=>{
                // 这里变回之前状态
                this.setStateStatus(PlayerType.None)
            }, this.state.attack.timeOutInterval)
        }, this.state.attack.interval)
    }
    keyUp(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.state.move.v.y -= 1
                break
            case KeyCode.KEY_S:
                this.state.move.v.y += 1
                break
            case KeyCode.KEY_A:
                this.state.move.v.x += 1
                break
            case KeyCode.KEY_D:
                this.state.move.v.x -= 1
                break
        }
    }
    setStateStatus(status: PlayerType) {
        this.state.lastStatus = this.state.status
        this.state.status = status
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

    update (deltaTime: number) {
        // 根据运动获取真实状态
        if (this.state.status == PlayerType.None && (this.state.move.v.x != 0 || this.state.move.v.y != 0)) {
            // 正在移动
            this.setStateStatus(PlayerType.MoveS)
        }
        switch (this.state.status) {
            case PlayerType.None:
                // 切换站立图
                if (this.state.lastStatus != PlayerType.None) {
                    resources.load("images/站立2", ImageAsset, (err: any, img) => {
                        this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
                    })
                    // 改变box
                    const collider = this.getComponent(BoxCollider2D)
                    collider.size.x = this.state.box.size.x
                    collider.size.y = this.state.box.size.y
                    collider.offset.x = this.state.box.offset.x
                    collider.offset.y = this.state.box.offset.y
                    collider.apply()
                }
                break
            case PlayerType.MoveS:
                this.setStateStatus(PlayerType.Moving)
                this.playRunAni()
                break
            case PlayerType.Moving:
                if (this.state.move.v.x == 0 && this.state.move.v.y == 0) {
                    this.setStateStatus(PlayerType.None)
                    this.stopAni() // 停止动画
                }
                if (this.state.move.v.x > 0) {
                    this.node.setScale(1, 1, 1)
                } else if (this.state.move.v.x < 0) {
                    this.node.setScale(-1, 1, 1)
                }
                // 计算将要移动是否超出范围
                const pos = new Vec3(this.node.position.x + this.state.move.v.x * this.moveSpeed * deltaTime, this.node.position.y + this.state.move.v.y * this.moveSpeed * deltaTime, 0)
                if (this.canMove(pos)) {
                    this.node.setPosition(pos)
                }
                break
        }
    }
    attackFirst() {
        // 切换攻击
        if (MoveType.indexOf(this.state.lastStatus) > -1) {
            // 停止动画
            this.stopAni()
        }
        resources.load("images/攻击1", ImageAsset, (err: any, img) => {
            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
        })
    }
    attackSecond() {
        // 切换攻击
        resources.load("images/攻击2", ImageAsset, (err: any, img) => {
            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
        })
    }
    attackThird() {
        // 切换攻击
        resources.load("images/攻击3", ImageAsset, (err: any, img) => {
            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
        })
    }
    attackFourth() {
        // 切换攻击
        resources.load("images/攻击4", ImageAsset, (err: any, img) => {
            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
        })
    }
    playRunAni() {
        // 执行动画
        const ani = this.getComponent(Animation)
        ani.play("run")
    }
    stopAni() {
        const ani = this.getComponent(Animation)
        ani.stop()
    }
    canMove(pos: Vec3) {
        const a = Math.pow(pos.x, 2) / Math.pow(this.moveMaxX, 2) + Math.pow(pos.y, 2) / Math.pow(this.moveMaxY, 2) - 1
        if (a > 0) {
            return false
        } else {
            return true
        }
    }
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
