
import { _decorator, Component, Node, input, Input, KeyCode, Vec3, Vec2, Vec4, Animation, Sprite, resources, SpriteFrame, 
    ImageAsset, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, EPhysics2DDrawFlags, } from 'cc';
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
 
@ccclass('PlayerControl')
export class PlayerControl extends Component {
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


    move: Vec4 = new Vec4(0, 0, 0, 0)
    movePlay: boolean = false

    start () {
        PhysicsSystem2D.instance.enable = true
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb | 
        EPhysics2DDrawFlags.Pair | 
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape
        resources.preload('images/zhanli', SpriteFrame)
        input.on(Input.EventType.KEY_DOWN, this.moveKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.moveKeyUp, this)
        // 注册碰撞
        // 注册单个碰撞体的回调函数
        // let collider = this.getComponent(BoxCollider2D);
        // console.log("collider", collider)
        // if (collider) {
        //     collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        // }
        // 注册全局碰撞回调函数
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
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
    moveKeyDown(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                if (this.move.x > 0) {
                    this.move.z = this.move.x
                }
                this.move.x = -1
                break
            case KeyCode.KEY_W:
                if (this.move.y < 0 ) {
                    this.move.w = this.move.y
                }
                this.move.y = 1
                break
            case KeyCode.KEY_S:
                if (this.move.y > 0 ) {
                    this.move.w = this.move.y
                }
                this.move.y = -1
                break
            case KeyCode.KEY_D:
                if (this.move.x < 0) {
                    this.move.z = this.move.x
                }
                this.move.x = 1
                break
            default:
                this.move.x = 0
                this.move.y = 0
                this.move.z = 0
                this.move.w = 0
                break
        }
    }
    moveKeyUp(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                if (this.move.z > 0) {
                    this.move.x = this.move.z
                } else {
                    if (this.move.x < 0){
                        this.move.x = 0
                    }
                }
                this.move.z = 0
                break
            case KeyCode.KEY_D:
                if (this.move.z < 0) {
                    this.move.x = this.move.z
                } else {
                    if (this.move.x > 0){
                        this.move.x = 0
                    }
                }
                this.move.z = 0
                break
            case KeyCode.KEY_W:
                if (this.move.w < 0) {
                    this.move.y = this.move.w
                } else {
                    if (this.move.y > 0){
                        this.move.y = 0
                    }
                }
                this.move.w = 0
                break
            case KeyCode.KEY_S:
                if (this.move.w > 0) {
                    this.move.y = this.move.w
                } else {
                    if (this.move.y < 0){
                        this.move.y = 0
                    }
                }
                this.move.w = 0
                break
            default:
                this.move.x = 0
                this.move.y = 0
                this.move.z = 0
                this.move.w = 0
                break
        }
    }

    update (deltaTime: number) {
        // [4]
        let b = false
        if (this.move.x > 0) {
            b = true
            if (!this.movePlay) {
                this.startRunAnimation()
            }
            this.node.setScale(1, 1, 1)
            // 计算将要移动是否超出范围
            const pos = new Vec3(this.node.position.x + this.moveSpeed * deltaTime, this.node.position.y, 0)
            if (this.canMove(pos)) {
                this.node.setPosition(pos)
            }
        } else if (this.move.x < 0) {
            b = true
            if (!this.movePlay) {
                this.startRunAnimation()
            }
            this.node.setScale(-1, 1, 1)
            const pos = new Vec3(this.node.position.x - this.moveSpeed * deltaTime, this.node.position.y, 0)
            if (this.canMove(pos)) {
                this.node.setPosition(pos)
            }
        }
        if (this.move.y > 0) {
            b = true
            if (!this.movePlay) {
                this.startRunAnimation()
            }
            const pos = new Vec3(this.node.position.x, this.node.position.y + (this.moveSpeed * deltaTime / 2), 0)
            if (this.canMove(pos)) {
                this.node.setPosition(pos)
            }
        } else if (this.move.y < 0) {
            b = true
            if (!this.movePlay) {
                this.startRunAnimation()
            }
            const pos = new Vec3(this.node.position.x , this.node.position.y - (this.moveSpeed * deltaTime / 2), 0)
            if (this.canMove(pos)) {
                this.node.setPosition(pos)
            }
        }
        if (!b) {
            this.stopRunAnimation()
        }
    }
    startRunAnimation() {
        const ani = this.getComponent(Animation)
        ani.play("run")
        this.movePlay = true
    }
    stopRunAnimation() {
        const ani = this.getComponent(Animation)
        ani.stop()
        resources.load("images/zhanli", ImageAsset, (err: any, img) => {
            this.getComponent(Sprite).spriteFrame = SpriteFrame.createWithImage(img)
        })
        let collider = this.getComponent(BoxCollider2D)
        collider.size.x = 18
        collider.size.y = 57
        this.movePlay = false
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
