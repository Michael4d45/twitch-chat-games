import * as World from "./world";
import { Canvas } from "../../game_base/client/types"
import Pos from "../../game_base/util/Pos";
import { Piece } from "./world/types"

let canvas: Canvas;
const scale = 40;

function piece_pos(i: number) {
    return ((i - 4) * 2)
}

const board_piece_pos = new Array<Pos>(64);
const board_square_pos = new Array<Pos>(64);
const board_color = new Array<string>(64);
for (let i = 0; i < 64; i++) {
    const y = Math.floor(i / 8);
    const x = i % 8;
    board_piece_pos[i] = new Pos(piece_pos(x) + 0.5, piece_pos(y) + 0.5);
    board_square_pos[i] = new Pos(piece_pos(x) + 0.05, piece_pos(y) + 0.05);
    board_color[i] = "white";
    if(x % 2 != y % 2) board_color[i] = "rgb(180, 100, 60)"
};

function set_canvas(new_canvas: Canvas) {
    canvas = new_canvas;
    canvas.set_scale(scale);
    canvas.draw_hook(draw_lines);
    canvas.draw_hook(draw_board);
    canvas.draw_hook(draw_text);
}

function draw_lines() {
    for (let i = -8; i <= 8; i += 2) {
        canvas.draw_line(new Pos(i, -8), new Pos(i, 8), "black");
        canvas.draw_line(new Pos(-8, i), new Pos(8, i), "black");
    }
}

function draw_board() {
    for(let i = 0; i < 64; i++) {
        draw_square(i);
        draw_piece(World.board[i], board_piece_pos[i]);
    }
}

function draw_square(index: number) {
    const pos = board_square_pos[index]
    const color = board_color[index]
    canvas.draw_square(pos, color, false, 1.9);
}

function draw_piece(piece: Piece, pos: Pos) {
    if (piece === null) return
    canvas.draw_text(piece.name + " " + piece.team, pos, "black")
}

const winner_pos = new Pos(0, -10);
const timer_pos = new Pos(0, 10);
const white_win_pos = new Pos(10, 0);
const black_win_pos = new Pos(10, 5);

function draw_text() {
    if (World.won) {
        canvas.draw_text("Winner: " + World.won, winner_pos, "red")
        const time = Math.round(World.won_timer / 1000).toString();
        canvas.draw_text("restarting in " + time, timer_pos, "black");
    }
    canvas.draw_text("White: " + World.White_wins, white_win_pos, "black");
    canvas.draw_text("black: " + World.Black_wins, black_win_pos, "black");
}

export {
    set_canvas,
    World,
}
