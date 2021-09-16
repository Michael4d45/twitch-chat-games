import * as World from "./world";
import { Canvas } from "../../game_base/client/types"
import Pos from "../../game_base/game/Pos";
import { Piece, Team } from "./types"

let canvas: Canvas;
const scale = 100;

function set_canvas(new_canvas: Canvas) {
    canvas = new_canvas;
    canvas.set_scale(scale);
    canvas.draw_hook(draw_lines);
    canvas.draw_hook(draw_board);
    canvas.draw_hook(draw_text);
}

function draw_lines() {
    const pos1 = new Pos(-1, -3);
    const pos2 = new Pos(-1, 3)

    const pos3 = new Pos(1, -3);
    const pos4 = new Pos(1, 3)

    const pos5 = new Pos(-3, -1);
    const pos6 = new Pos(3, -1)

    const pos7 = new Pos(-3, 1);
    const pos8 = new Pos(3, 1);

    canvas.draw_line(pos1, pos2, 'black');
    canvas.draw_line(pos3, pos4, 'black');
    canvas.draw_line(pos5, pos6, 'black');
    canvas.draw_line(pos7, pos8, 'black');
}

function draw_board() {
}

function draw_piece(piece: Piece, pos: Pos) {
    switch (piece) {
    }
}

function draw_text() {
    switch (World.won) {
    }
}

export {
    set_canvas,
    World,
}
