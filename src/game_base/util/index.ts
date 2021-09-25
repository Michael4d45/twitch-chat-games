enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

const WORLD_FPS = 30;
const NEXT_FRAME = 1000 / WORLD_FPS;

function number_to_direction(n: number): Direction {
    switch (Math.abs(n) % 4) {
        case 0: return Direction.Up;
        case 1: return Direction.Down;
        case 2: return Direction.Left;
        default: return Direction.Right;
    }
}

function hash(s: string | number) {
    s = s.toString();
    var hash = 0, i, chr;
    if (s.length === 0) return hash;
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function d_hash(s: string | number) {
    return hash(hash(s));
}

function random_color(id: string | number) {
    let h = d_hash(id);
    const R = Math.abs(h % 255);
    h = d_hash(h);
    const G = Math.abs(h % 255);
    h = d_hash(h);
    const B = Math.abs(h % 255);
    return `rgb(${R}, ${G}, ${B})`;
}

function random_direction(s: string | number) {
    return number_to_direction(d_hash(s));
}

export {
    hash,
    Direction,
    number_to_direction,
    random_color,
    random_direction,
    NEXT_FRAME,
}