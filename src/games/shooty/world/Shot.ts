import Pos, { PosData, Direction } from "../../../game_base/game/Pos";

export interface ShotData {
    pos: PosData
    life: number
    direction: Direction
}

export default class Shot {
    pos: Pos;
    life: number;
    direction: Direction;

    constructor(pos: Pos, life: number, direction: Direction) {
        this.pos = pos;
        this.life = life;
        this.direction = direction;
    }

    animate() {
        this.life -= 1;
        if (this.life % 2 == 0)
            this.pos.move(this.direction);
    }

    toJSON(): ShotData {
        return {
            pos: this.pos.toJSON(),
            life: this.life,
            direction: this.direction
        }
    }

    static fromJSON(shot: ShotData) {
        const pos = Pos.fromJSON(shot.pos);
        const s = new Shot(pos, shot.life, shot.direction);
        return s;
    }
}
