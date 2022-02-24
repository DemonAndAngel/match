
import { _decorator, Component, Node, input, Input, KeyCode, Vec3, Vec2, Vec4, Animation, Sprite, resources, SpriteFrame, 
    ImageAsset, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, ERigidBody2DType, PhysicsSystem2D, EPhysics2DDrawFlags, RigidBody2D, } from 'cc';
import {AttackType} from './AttackType';
import { PlayerType } from './PlayerType';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerControl
 * DateTime = Thu Feb 17 2022 00:46:01 GMT+0800 (中国标准时间)
 * Author = aa568089002
 * FileBasename = PlayerControl.ts
 * FileBasenameNoExtension = PlayerControl
 * URL = db://assets/scripts/PlayerControl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('PlayerControllerCopy')
export class PlayerControllerCopy extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property
    moveSpeed: number = 100
    @property
    maxY: number = 175
    @property
    maxX: number = 455


    state = {
        status: PlayerType.None,
        move: {
            animating: false, // 是否正在播放动画
            v: new Vec4(0,0,0,0) // 移动方向数据
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



    start () {
        input.on(Input.EventType.KEY_DOWN, this.moveKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.moveKeyUp, this)
        // 注册碰撞
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        // 注册全局碰撞回调函数
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        // }

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
    moveKeyDown(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                if (this.state.status == PlayerType.None) {
                    this.state.status = PlayerType.Moving    
                }
                if (this.state.move.v.x > 0) {
                    this.state.move.v.z = this.state.move.v.x
                }
                this.state.move.v.x = -1
                break
            case KeyCode.KEY_W:
                if (this.state.status == PlayerType.None) {
                    this.state.status = PlayerType.Moving    
                }
                if (this.state.move.v.y < 0 ) {
                    this.state.move.v.w = this.state.move.v.y
                }
                this.state.move.v.y = 1
                break
            case KeyCode.KEY_S:
                if (this.state.status == PlayerType.None) {
                    this.state.status = PlayerType.Moving    
                }
                if (this.state.move.v.y > 0 ) {
                    this.state.move.v.w = this.state.move.v.y
                }
                this.state.move.v.y = -1
                break
            case KeyCode.KEY_D:
                if (this.state.status == PlayerType.None) {
                    this.state.status = PlayerType.Moving    
                }
                if (this.state.move.v.x < 0) {
                    this.state.move.v.z = this.state.move.v.x
                }
                this.state.move.v.x = 1
                break
            case KeyCode.KEY_J:
                this.stopAni()
                this.state.status = PlayerType.Attacking
                this.state.attack.time = new Date()
                // this.stopRunAnimation()
                switch (this.state.attack.status) {
                    case AttackType.None:
                        this.state.attack.status = AttackType.FirstS // 改变攻击状态
                        // todo::替换图片
                        // 添加进入下一动作定时器
                        this.state.attack.timer = setTimeout(()=>{
                            this.state.attack.status = AttackType.FirstE // 改变攻击状态
                            // 清除节点
                            const attack = this.node.getChildByName("attack")
                            attack.destroy()
                        }, this.state.attack.interval)
                        // 添加超时定时器
                        this.state.attack.timeOutTimer = setTimeout(()=>{
                            this.state.status = PlayerType.None
                            this.state.attack.status = AttackType.None // 改变攻击状态
                            this.state.move.animating = false
                            this.startZhanli()
                        }, this.state.attack.timeOutInterval)
                        break
                    case AttackType.First:
                        break
                    case AttackType.FirstE:
                        // 第一状态结束 说明进入下一状态
                        this.state.attack.status = AttackType.SecondS // 改变攻击状态
                        // 删除之前超时定时器
                        clearTimeout(this.state.attack.timeOutTimer)
                        // todo::替换图片
                        // 添加进入下一动作定时器
                        this.state.attack.timer = setTimeout(()=>{
                            this.state.attack.status = AttackType.SecondE // 改变攻击状态
                        }, this.state.attack.interval)
                        // 添加超时定时器
                        this.state.attack.timeOutTimer = setTimeout(()=>{
                            this.state.status = PlayerType.None
                            this.state.attack.status = AttackType.None // 改变攻击状态
                            this.state.move.animating = false
                            this.startZhanli()
                        }, this.state.attack.timeOutInterval)
                        break
                    case AttackType.Second:
                        break
                    case AttackType.SecondE:
                        break
                }
                break
            default:
                break
        }
    }
    moveKeyUp(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                if (this.state.move.v.z > 0) {
                    this.state.move.v.x = this.state.move.v.z
                } else {
                    if (this.state.move.v.x < 0){
                        this.state.move.v.x = 0
                    }
                }
                this.state.move.v.z = 0
                break
            case KeyCode.KEY_D:
                if (this.state.move.v.z < 0) {
                    this.state.move.v.x = this.state.move.v.z
                } else {
                    if (this.state.move.v.x > 0){
                        this.state.move.v.x = 0
                    }
                }
                this.state.move.v.z = 0
                break
            case KeyCode.KEY_W:
                if (this.state.move.v.w < 0) {
                    this.state.move.v.y = this.state.move.v.w
                } else {
                    if (this.state.move.v.y > 0){
                        this.state.move.v.y = 0
                    }
                }
                this.state.move.v.w = 0
                break
            case KeyCode.KEY_S:
                if (this.state.move.v.w > 0) {
                    this.state.move.v.y = this.state.move.v.w
                } else {
                    if (this.state.move.v.y < 0){
                        this.state.move.v.y = 0
                    }
                }
                this.state.move.v.w = 0
                break
            case KeyCode.KEY_J:
                break
            default:
                break
        }
    }

    update (deltaTime: number) {
        switch (this.state.status) {
            case PlayerType.None:
                break
            case PlayerType.Moving:
                if (!this.state.move.animating) {
                    this.state.move.animating = true
                    this.startMoveAni()
                }
                // 正在移动
                let b = false
                if (this.state.move.v.x > 0) {
                    b = true
                    this.node.setScale(1, 1, 1)
                    // 计算将要移动是否超出范围
                    const pos = new Vec3(this.node.position.x + this.moveSpeed * deltaTime, this.node.position.y, 0)
                    if (this.canMove(pos)) {
                        this.node.setPosition(pos)
                    }
                } else if (this.state.move.v.x < 0) {
                    b = true
                    this.node.setScale(-1, 1, 1)
                    const pos = new Vec3(this.node.position.x - this.moveSpeed * deltaTime, this.node.position.y, 0)
                    if (this.canMove(pos)) {
                        this.node.setPosition(pos)
                    }
                }
                if (this.state.move.v.y > 0) {
                    b = true
                    const pos = new Vec3(this.node.position.x, this.node.position.y + (this.moveSpeed * deltaTime / 2), 0)
                    if (this.canMove(pos)) {
                        this.node.setPosition(pos)
                    }
                } else if (this.state.move.v.y < 0) {
                    b = true
                    const pos = new Vec3(this.node.position.x , this.node.position.y - (this.moveSpeed * deltaTime / 2), 0)
                    if (this.canMove(pos)) {
                        this.node.setPosition(pos)
                    }
                }
                if (!b) {
                    this.stopMove()
                }
                break
            case PlayerType.Attacking:
                switch (this.state.attack.status) {
                    case AttackType.FirstS:
                        resources.load("images/攻击2", ImageAsset, (err: any, img) => {
                            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
                        })
                        this.state.attack.status = AttackType.First
                        let attack = new Node("attack")
                        attack.setParent(this.node)
                        let rigidBody = attack.addComponent(RigidBody2D)
                        rigidBody.group = 1
                        rigidBody.type = ERigidBody2DType.Kinematic
                        rigidBody.enabledContactListener = true
                        let collider = attack.addComponent(BoxCollider2D)
                        collider.size.x = 45
                        collider.size.y = 20
                        collider.offset.y = 18
                        if (this.node.scale.x < 0) {
                            collider.offset.x = -20
                        } else {
                            collider.offset.x = 20
                        }
                        collider.apply()
                    break
                    case AttackType.SecondS:
                        resources.load("images/攻击4", ImageAsset, (err: any, img) => {
                            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
                        })
                        this.state.attack.status = AttackType.Second
                    break
                }
                break
        }
    }
    startZhanli() {
        resources.load("images/站立2", ImageAsset, (err: any, img) => {
            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
        })
    }
    startMoveAni() {
        const ani = this.getComponent(Animation)
        ani.play("run")
    }
    stopAni() {
        this.state.move.animating = false
        const ani = this.getComponent(Animation)
        ani.stop()
    }
    stopMove() {
        this.state.status = PlayerType.None
        this.stopAni()
        this.startZhanli()
        let collider = this.getComponent(BoxCollider2D)
        collider.offset.x = 0
        collider.offset.y = 0
        collider.size.x = 38
        collider.size.y = 100
        collider.apply()
    }
    canMove(pos: Vec3) {
        const x = pos.x
        const y = pos.y
        const a = (x*x)/(this.maxX*this.maxX) + (y*y) / (this.maxY*this.maxY) - 1
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
