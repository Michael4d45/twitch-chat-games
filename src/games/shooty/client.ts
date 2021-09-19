import * as World from "./world";
import Player from "./world/Player";
import { Canvas } from "../../game_base/client/types"

let canvas: Canvas;
const scale = 20;

function set_canvas(new_canvas: Canvas) {
    canvas = new_canvas;
    canvas.set_scale(scale);
    canvas.draw_hook(draw_players);
}

function draw_players() {
    World.players.forEach((player: Player) => {
        draw_player(player);
    });
}

function draw_player(player: Player) {
    const color = player.color;
    canvas.draw_square(player.pos, color);
    if (player.shot) {
        canvas.draw_circle(player.shot.pos, color);
    }
}

export {
    set_canvas,
    World,
}
