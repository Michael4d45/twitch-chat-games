enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

interface PosData {
    x: number,
    y: number
}

export default class Pos {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Pos(this.x, this.y);
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    translate(x: number, y: number) {
        this.x += x;
        this.y += y;
        return this;
    }

    move(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                this.y -= 1
                break;
            case Direction.Down:
                this.y += 1
                break;
            case Direction.Left:
                this.x -= 1
                break;
            case Direction.Right:
                this.x += 1
                break;
        }
        return this;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    inside(x: number, y: number, w: number, h: number): boolean {
        if (this.x < x || this.y < y)
            return false;
        if (this.x > w || this.y > h)
            return false;
        return true;
    }

    toJSON(): PosData {
        return {
            x: this.x,
            y: this.y
        }
    }

    static fromJSON(pos: PosData) {
        return new Pos(pos.x, pos.y)
    }
}

export {
    PosData,
    Direction,
}