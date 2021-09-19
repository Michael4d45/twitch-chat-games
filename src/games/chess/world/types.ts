import * as space from "./space";

type Team = "white" | "black";

type PieceName = "K" | "Q" | "B" | "N" | "R" | "P"

type Extra = {
    can_en_passant?: boolean
}

type PieceData = {
    moves: number
    extra: Extra
}

type Piece = {
    name: PieceName
    team: Team
    data: PieceData
} | null;

type Board = [
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
    Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece,
];

function make_piece(name: PieceName, team: Team) {
    const extra: Extra = {}
    if(name == "P") {
        extra.can_en_passant = false;
    }
    return {
        name: name,
        team: team,
        data: {
            moves: 0,
            extra: {}
        }
    }
}

function empty_board(): Board {
    return [
        make_piece("R", "black"), make_piece("N", "black"), make_piece("B", "black"), make_piece("Q", "black"), make_piece("K", "black"), make_piece("B", "black"), make_piece("N", "black"), make_piece("R", "black"),
        make_piece("P", "black"), make_piece("P", "black"), make_piece("P", "black"), make_piece("P", "black"), make_piece("P", "black"), make_piece("P", "black"), make_piece("P", "black"), make_piece("P", "black"),
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        make_piece("P", "white"), make_piece("P", "white"), make_piece("P", "white"), make_piece("P", "white"), make_piece("P", "white"), make_piece("P", "white"), make_piece("P", "white"), make_piece("P", "white"),
        make_piece("R", "white"), make_piece("N", "white"), make_piece("B", "white"), make_piece("Q", "white"), make_piece("K", "white"), make_piece("B", "white"), make_piece("N", "white"), make_piece("R", "white"),
    ]
}

type MoveResult = {
    from_space: space.Space;
    to_space: space.Space | null;
}

type ErrorResult = null;

type AttackResult = Array<MoveResult> | MoveResult | ErrorResult;

type PieceAttack = (from_space: space.Space, to_space: space.Space, board: Board) => AttackResult;

export {
    Team, Piece,
    PieceName,

    empty_board, Board,

    PieceAttack,
    AttackResult, MoveResult
}