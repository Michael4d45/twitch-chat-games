import * as World from "./world";
import { Canvas } from "../../game_base/client/types"
import Pos from "../../game_base/util/Pos";
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
    const pos = new Pos(-2, -2);
    draw_piece(World.board[0], pos)
    pos.translate(2, 0)
    draw_piece(World.board[1], pos)
    pos.translate(2, 0)
    draw_piece(World.board[2], pos)
    pos.set(-2, 0);

    draw_piece(World.board[3], pos)
    pos.translate(2, 0)
    draw_piece(World.board[4], pos)
    pos.translate(2, 0)
    draw_piece(World.board[5], pos)
    pos.set(-2, 2);

    draw_piece(World.board[6], pos)
    pos.translate(2, 0)
    draw_piece(World.board[7], pos)
    pos.translate(2, 0)
    draw_piece(World.board[8], pos)
}

function draw_piece(piece: Piece, pos: Pos) {
    switch (piece) {
        case Piece.X:
            draw_X(pos);
            break;
        case Piece.O:
            draw_O(pos);
            break;
    }
}

function draw_X(pos: Pos) {
    const pos1 = pos.copy().translate(-1, -1);
    const pos2 = pos.copy().translate(1, 1);
    const pos3 = pos.copy().translate(-1, 1);
    const pos4 = pos.copy().translate(1, -1);
    canvas.draw_line(pos1, pos2, 'black');
    canvas.draw_line(pos3, pos4, 'black');
}

function draw_O(pos: Pos) {
    pos = pos.copy().translate(-2, -2);
    canvas.draw_circle(pos, 'black', true, 4);
}

const win_pos = new Pos(-1, -3.5);
const timer_pos = new Pos(-1, 4);
const X_pos = new Pos(4, -3);
const O_pos = new Pos(4, 0);

function draw_text() {
    switch (World.won) {
        case Team.O:
            canvas.draw_text("Winner : O", win_pos, "blue");
            break;
        case Team.X:
            canvas.draw_text("Winner : X", win_pos, "red");
            break;
    }
    if (World.won !== null) {
        const time = Math.round(World.won_timer / 1000).toString();
        canvas.draw_text("restarting in " + time, timer_pos, "black");
    }
    canvas.draw_text("X: " + World.X_wins, X_pos, "blue");
    canvas.draw_text("O: " + World.O_wins, O_pos, "blue");
}

export {
    set_canvas,
    World,
}
