
import { _decorator, Component, Contact2DType, v2, PhysicsSystem2D, Collider2D, IPhysics2DContact, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CameraController
 * DateTime = Fri Feb 18 2022 17:09:46 GMT+0800 (中国标准时间)
 * Author = aa568089002
 * FileBasename = CameraController.ts
 * FileBasenameNoExtension = CameraController
 * URL = db://assets/scripts/CameraController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('CameraController')
export class CameraController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onLoad() {
        console.log("onLoad")
        PhysicsSystem2D.instance.enable = true
        PhysicsSystem2D.instance.gravity = v2()
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb | 
        EPhysics2DDrawFlags.Pair | 
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape

        // 注册全局碰撞回调函数
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        console.log("onLoadEnd")
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log("self group", selfCollider.group)
        console.log("self tag", selfCollider.tag)
        console.log("other group", otherCollider.group)
        console.log("other tag", otherCollider.tag)
        console.log('onBeginContact')
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact')
    }

    start () {
        // [3]
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
