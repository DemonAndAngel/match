
import { _decorator, Component, Node, input, Input, KeyCode, Vec3, Vec2, Vec4, Animation, Sprite, resources, SpriteFrame, ImageAsset } from 'cc';
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
        resources.preload('images/zhanli', SpriteFrame)
        input.on(Input.EventType.KEY_DOWN, this.moveKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.moveKeyUp, this)
    }
    moveKeyDown(event: any) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                console.log("A")
                if (this.move.x > 0) {
                    this.move.z = this.move.x
                }
                this.move.x = -1
                break
            case KeyCode.KEY_W:
                console.log("W")
                if (this.move.y < 0 ) {
                    this.move.w = this.move.y
                }
                this.move.y = 1
                break
            case KeyCode.KEY_S:
                console.log("S")
                if (this.move.y > 0 ) {
                    this.move.w = this.move.y
                }
                this.move.y = -1
                break
            case KeyCode.KEY_D:
                console.log("D")
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
