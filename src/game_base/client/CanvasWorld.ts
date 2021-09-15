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

function draw_square_at(pos: Pos, color: string, stroke = false) {
    pos = convert_pos(pos)
    const old_color = ctx.fillStyle;
    ctx.fillStyle = color;

    if (stroke) ctx.strokeRect(pos.x, pos.y, scale, scale);
    else ctx.fillRect(pos.x, pos.y, scale, scale);

    ctx.fillStyle = old_color;
}

function draw_circle_at(pos: Pos, color: string, stroke = false, size = 1) {
    pos = convert_pos(pos);
    size *= scale;
    size /= 2;
    pos.translate(size, size);
    const old_color = ctx.fillStyle;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, size / 2, 0, 2 * Math.PI);
    if (stroke) ctx.stroke();
    else ctx.fill();

    ctx.fillStyle = old_color;
}

function draw_line(pos1: Pos, pos2: Pos, color: string, thickness: number = 1) {
    pos1 = convert_pos(pos1);
    pos2 = convert_pos(pos2);
    const old_thickness = ctx.lineWidth;
    ctx.lineWidth = thickness;
    const old_color = ctx.strokeStyle;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();

    ctx.lineWidth = old_thickness;
    ctx.strokeStyle = old_color;
}

function set_scale(new_scale: number) {
    scale = new_scale;
}

ctx.font = "30px Arial";

function draw_text(text: string, pos: Pos, color: string, size: number = 0.3) {
    pos = convert_pos(pos);
    const old_color = ctx.strokeStyle;
    ctx.strokeStyle = color;
    size *= scale;
    ctx.font = size.toString() + "px Arial";

    ctx.fillText(text, pos.x, pos.y);

    ctx.strokeStyle = old_color;
}

export {
    draw,
    draw_hook,
    draw_square_at,
    draw_circle_at,
    draw_line,
    clear_draws,
    set_scale,
    draw_text,
}