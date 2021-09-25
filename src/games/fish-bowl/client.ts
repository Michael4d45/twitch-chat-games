import * as World from "./world";
import { Canvas } from "../../game_base/client/types"
import Fish from "./world/fish";

let canvas: Canvas;
const scale = 10;

function set_canvas(new_canvas: Canvas) {
    canvas = new_canvas;
    canvas.set_scale(scale);
    canvas.draw_hook(draw_fishes)
}

function draw_fishes() {
    console.log("Drawing")
    World.fishes.forEach(draw_fish)
}

function draw_fish(fish: Fish) {
    canvas.draw_square(fish.pos, fish.color)
}

export {
    set_canvas,
    World,
}