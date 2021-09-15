import { Direction } from "../../../game_base/game/Pos"
import Shot, { ShotData } from "./Shot";
import Pos, { PosData } from "../../../game_base/game/Pos";

const ZERO = new Pos(0, 0)

function hash(s: string) {
    var hash = 0, i, chr;
    if (s.length === 0) return hash;
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function randomColor(id: string) {
    let h = hash(id);
    const R = Math.abs(h % 255);
    h = hash(h.toString());
    const G = Math.abs(h % 255);
    h = hash(h.toString());
    const B = Math.abs(h % 255);
    return `rgb(${R}, ${G}, ${B})`;
}

export interface PlayerData {
    pos: PosData
    id: string
    color: string
    direction: Direction
    shot: ShotData | null
    shot_life: number
}

export default class Player {
    pos = ZERO.copy();
    id: string;
    color: string;
    direction: Direction = Direction.Up;
    shot: Shot | null = null;
    shot_life = 50;

    constructor(id: string) {
        this.id = id;
        this.color = randomColor(id);
    }

    move(direction: Direction) {
        this.pos.move(direction)
        this.direction = direction;
    }

    shoot() {
        if (this.shot) return;
        this.shot = new Shot(this.pos.copy(), this.shot_life, this.direction);
    }

    animate() {
        const shot = this.shot;
        if (shot) {
            shot.animate()
            if (shot.life <= 0) {
                this.shot = null
            }
        }
    }

    toJSON(): PlayerData {
        return {
            pos: this.pos.toJSON(),
            id: this.id,
            color: this.color,
            direction: this.direction,
            shot: this.shot ? this.shot.toJSON() : null,
            shot_life: this.shot_life,
        }
    }

    static fromJSON(player: PlayerData) {
        const p = new Player(player.id)
        p.pos = Pos.fromJSON(player.pos)
        p.color = player.color;
        p.direction = player.direction;
        if (player.shot)
            p.shot = Shot.fromJSON(player.shot)
        p.shot_life = player.shot_life;
        return p;
    }
}