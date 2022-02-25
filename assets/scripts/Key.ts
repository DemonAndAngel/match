export enum KeyType {
    None = 0,
    KeyDown = 1,
    KeyUp = 2,
}
export class KeyStatus {
    downTime: number
    upTime: number
    interval: number
    constructor(){
        this.downTime = 0
        this.upTime = 0
        this.interval = 0
    }
}
export class Key {
    status: KeyType
    press = {
        last: new KeyStatus(),
        now: new KeyStatus()
    }
    constructor(){
        this.status = KeyType.None
    }
    setDown() {
        this.press.last = this.press.now
        this.press.now.downTime = Date.now()
        this.status = KeyType.KeyDown
    }
    setUp() {
        this.press.now.upTime = Date.now()
        this.status = KeyType.KeyUp
        this.press.now.interval = this.press.now.upTime - this.press.now.downTime
    }
}
export function NewKey() {
    return new Key()
}

