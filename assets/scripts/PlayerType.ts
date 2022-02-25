export enum PlayerType {
    None = 0, // 静止
    MoveS = 1, // 准备移动
    Moving = 2, // 移动中 已加上动画
    JumpS = 13,
    Jumping = 14,
    AttackFirstS = 3, // 攻击1准备启动 替换图片
    AttackFirstE = 5, // 攻击1结束
    AttackSecondS = 6, // 攻击2准备启动 替换图片
    AttackSecondE = 8, // 攻击2结束
    AttackThirdS = 9,
    AttackThirdE = 10,
    AttackFourthS = 11,
    AttackFourthE = 12,
}
export const MoveType: Array<PlayerType> = [
    PlayerType.MoveS,
    PlayerType.Moving,
]
export const JumpType: Array<PlayerType> = [
    PlayerType.JumpS,
    PlayerType.Jumping,
]
export const AttackType: Array<PlayerType> = [
    PlayerType.AttackFirstS,
    PlayerType.AttackFirstE,
    PlayerType.AttackSecondS,
    PlayerType.AttackSecondE,
    PlayerType.AttackThirdS,
    PlayerType.AttackThirdE,
    PlayerType.AttackFourthS,
    PlayerType.AttackFourthE,
]