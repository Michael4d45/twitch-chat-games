import * as World from "./world";
import { Canvas } from "../../game_base/client/types"

let canvas: Canvas;
const scale = 100;

function set_canvas(new_canvas: Canvas) {
    canvas = new_canvas;
    canvas.set_scale(scale);
}

export {
    set_canvas,
    World,
}
