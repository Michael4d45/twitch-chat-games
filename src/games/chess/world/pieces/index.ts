import * as King from "./king"
import * as Queen from "./queen"
import * as Bishop from "./bishop"
import * as Knight from "./knight"
import * as Rook from "./rook"
import * as Pawn from "./pawn"
import { PieceAttack, PieceName } from "../types"

function get_attack(piece_name: PieceName): PieceAttack {
    switch (piece_name) {
        case "K": return King.attack
        case "Q": return Queen.attack
        case "B": return Bishop.attack
        case "N": return Knight.attack
        case "R": return Rook.attack
        case "P": return Pawn.attack
    }
}

export {
    get_attack,
}