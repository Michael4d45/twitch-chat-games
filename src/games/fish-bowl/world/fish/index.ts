import { hash, random_color } from "../../../../game_base/util";
import Pos, { PosData } from "../../../../game_base/util/Pos";

interface FishData {
    pos: PosData,
    to_pos: PosData,
    color: string,
    life: number,
    seed: number,
    speed: number,
    sleeping: number,
    sleepyness: number,
    friendliness: number,
    friendly_to: number,
}

const MAX_LIFE = 500;
const MAX_SLEEPINESS = 50;
const MAX_SLEEPING = 50;
const MAX_SPEED = 100;
const MAX_DISTANCE = 3;
const HALF_DISTANCE = Math.floor(MAX_DISTANCE / 2);
const MAX_FRIENDLY = 100;
const HALF_FRIENDLY = 0.1;
const FRIENDLY_TO = 2;

export default class Fish {
    pos = new Pos(0, 0);
    to_pos = new Pos(0, 0);
    color = "";
    life = 0;
    seed = 0;
    speed = 0;
    sleeping = 0;
    sleepyness = 0;
    friendliness = 0;
    friendly_to = 0;

    constructor(i?: number) {
        if (i !== undefined) {
            this.seed = i;
            this.renew()
        }
    }

    get_seed() {
        this.seed = Math.abs(hash(this.seed))
        return this.seed
    }

    move(fishes: Array<Fish>) {
        if (this.sleeping > 0) {
            this.sleeping--;
            return;
        }

        if (this.pos.square_distance_to(this.to_pos) >= 1) {
            this.pos.move_toward(this.to_pos, this.speed);
        } else {
            const to_pos = this.to_pos;
            to_pos.translate(
                (this.get_seed() % MAX_DISTANCE) - HALF_DISTANCE,
                (this.get_seed() % MAX_DISTANCE) - HALF_DISTANCE,
            );
            for (let i = 0; i < fishes.length; i++) {
                if (this.friendliness < 0) break;
                const fish = fishes[i];
                let sign = 0.75;
                if (this.friendly_to !== fish.friendly_to) {
                    // if (this.get_seed() % 2 == 0) break;
                    // sign = -1 / this.fishes.length
                    break;
                };
                to_pos.move_toward(fish.pos, sign * this.friendliness)
            }
        }

        if (this.get_seed() % this.sleepyness === 0) {
            this.sleeping = this.get_seed() % MAX_SLEEPING;
        }

        this.life -= 1;
    }

    is_dead() {
        return this.life <= 0;
    }

    renew() {
        this.color = random_color(this.get_seed())
        this.pos.set(0, 0);
        this.to_pos.set(0, 0);
        this.life = this.get_seed() % MAX_LIFE;
        this.sleepyness = this.get_seed() % MAX_SLEEPINESS;
        this.sleeping = 0;
        this.speed = (((this.get_seed() % (MAX_SPEED - 1)) + 1) / (MAX_SPEED)) / 2;
        this.friendliness = ((this.get_seed() % MAX_FRIENDLY) - HALF_FRIENDLY) / MAX_FRIENDLY;
        this.friendly_to = this.get_seed() % FRIENDLY_TO;
        if (this.friendliness < 0) this.speed /= 10
        else this.speed *= 2
    }

    toJSON(): FishData {
        return {
            pos: this.pos.toJSON(),
            to_pos: this.to_pos.toJSON(),
            color: this.color,
            life: this.life,
            seed: this.seed,
            sleeping: this.sleeping,
            speed: this.speed,
            sleepyness: this.sleepyness,
            friendliness: this.friendliness,
            friendly_to: this.friendly_to,
        }
    }

    static fromJSON(data: FishData) {
        const fish = new Fish();
        fish.color = data.color;
        fish.seed = data.seed;
        fish.pos.set(data.pos.x, data.pos.y);
        fish.to_pos.set(data.to_pos.x, data.to_pos.y);
        fish.life = data.life;
        fish.speed = data.speed;
        fish.sleeping = data.sleeping;
        fish.sleepyness = data.sleepyness;
        fish.friendliness = data.friendliness;
        fish.friendly_to = data.friendly_to;
        return fish
    }
}

export {
    FishData
}