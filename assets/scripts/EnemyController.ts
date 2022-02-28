
import { _decorator, Component, Node, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyManager
 * DateTime = Fri Feb 18 2022 16:37:45 GMT+0800 (中国标准时间)
 * Author = aa568089002
 * FileBasename = EnemyManager.ts
 * FileBasenameNoExtension = EnemyManager
 * URL = db://assets/scripts/EnemyManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('EnemyManager')
export class EnemyManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        let collider = this.getComponent(BoxCollider2D)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
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
