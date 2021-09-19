import Pos from "../game/Pos";

const canvas = <HTMLCanvasElement>document.getElementById("c");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

let scale = 20;

const w = window.innerWidth;
const h = window.innerHeight;

canvas.width = w;
canvas.height = h;

let x_offset = w / 2;
let y_offset = h / 2;

window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const old_w = canvas.width;
    const old_h = canvas.height;

    canvas.width = w;
    canvas.height = h;

    x_offset += (w - old_w) / 2;
    y_offset += (h - old_h) / 2;

    //ctx.font = "30px Areal";
});

function convert_pos(pos: Pos): Pos {
    return pos.copy()
        .scale(scale)
        .translate(x_offset, y_offset)
        .translate(-scale / 2, -scale / 2);
}

let draw_callbacks: Array<Function> = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_callbacks.forEach(callback => callback())
}

function draw_hook(callback: Function) {
    draw_callbacks.push(callback);
}

function clear_draws() {
    draw_callbacks = [];
}

function draw_square(pos: Pos, color: string, stroke = false, size = 1) {
    size *= scale;
    pos = convert_pos(pos)
    ctx.fillStyle = color;

    if (stroke) ctx.strokeRect(pos.x, pos.y, size, size);
    else ctx.fillRect(pos.x, pos.y, size, size);
}

function draw_circle(pos: Pos, color: string, stroke = false, size = 1) {
    pos = convert_pos(pos);
    size *= scale;
    size /= 2;
    pos.translate(size, size);
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, size / 2, 0, 2 * Math.PI);
    if (stroke) ctx.stroke();
    else ctx.fill();
}

function draw_line(pos1: Pos, pos2: Pos, color: string, thickness: number = 1) {
    pos1 = convert_pos(pos1);
    pos2 = convert_pos(pos2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
}

function set_scale(new_scale: number) {
    scale = new_scale;
}

ctx.font = "30px Arial";

function draw_text(text: string, pos: Pos, color: string, size: number = 0.3) {
    pos = convert_pos(pos);
    size *= scale;
    ctx.font = size.toString() + "px Arial";
    ctx.fillStyle = color;

    ctx.fillText(text, pos.x, pos.y);
}

export {
    draw,
    draw_hook,
    draw_square,
    draw_circle,
    draw_line,
    clear_draws,
    set_scale,
    draw_text,
}