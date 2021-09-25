import { Direction, hash, number_to_direction, random_color, random_direction } from "../../../../game_base/util";
import Pos, { PosData } from "../../../../game_base/util/Pos";

interface FishData {
    direction: Direction,
    pos: PosData,
    color: string,
    life: number,
    seed: number,
}

export default class Fish {
    direction: Direction = Direction.Left;
    pos: Pos = new Pos(0, 0);
    color: string = "";
    life: number = 0;
    seed: number = 0;

    constructor(i?: number) {
        if (i !== undefined) {
            this.seed = i;
            this.renew()
        }
    }

    get_seed() {
        this.seed = hash(this.seed)
        return this.seed
    }

    move() {
        this.pos.move(this.direction);
        this.life -= 1;
        this.change_direction()
    }

    change_direction() {
        this.direction = random_direction(this.life + this.direction + this.color);
    }

    is_dead() {
        return this.life <= 0;
    }

    renew() {
        this.color = random_color(this.get_seed())
        this.pos.set(0, 0);
        this.direction = random_direction(this.get_seed());
        this.life = hash(this.get_seed()) % 500;
    }

    toJSON(): FishData {
        return {
            direction: this.direction,
            pos: this.pos.toJSON(),
            color: this.color,
            life: this.life,
            seed: this.seed,
        }
    }

    static fromJSON(data: FishData) {
        const fish = new Fish();
        fish.color = data.color;
        fish.seed = data.seed;
        fish.direction = data.direction;
        fish.pos.set(data.pos.x, data.pos.y);
        fish.life = data.life;
        return fish
    }
}

export {
    FishData
}