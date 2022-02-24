export enum KeyType {
    None = 0,
    KeyDown = 1,
    KeyUp = 2,
}
export class Key {
    status: KeyType
    downTime: number
    upTime: number
    interval: number // 按下到抬起间隔
    constructor(){
        this.status = KeyType.None
        this.interval = 0
    }
    setDown() {
        this.downTime = Date.now()
        this.status = KeyType.KeyDown
    }
    setUp() {
        this.upTime = Date.now()
        this.status = KeyType.KeyUp
        this.interval = this.upTime - this.downTime
    }
}
export function NewKey() {
    return new Key()
}

