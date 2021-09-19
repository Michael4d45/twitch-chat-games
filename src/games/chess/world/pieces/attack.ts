import { Board, Piece } from "../types";
import * as Pieces from "."
import { Space } from "../space";

function attack(from_piece: Piece, from_space: Space, to_space: Space, board: Board) {
    if (from_piece === null) return null;
    const piece_attack = Pieces.get_attack(from_piece.name);

    return piece_attack(from_space, to_space, board);
}

export {
    attack,
}
