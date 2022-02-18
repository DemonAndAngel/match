
import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BgController
 * DateTime = Fri Feb 18 2022 17:09:46 GMT+0800 (中国标准时间)
 * Author = aa568089002
 * FileBasename = BgController.ts
 * FileBasenameNoExtension = BgController
 * URL = db://assets/scripts/BgController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('BgController')
export class BgController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onLoad() {
        PhysicsSystem2D.instance.enable = true
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb | 
        EPhysics2DDrawFlags.Pair | 
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape
        
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
