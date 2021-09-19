import * as space from "../space";
import { Board } from "../types";

function attack(from_space: space.Space, to_space: space.Space, board: Board) {
    const from_piece = board[space.space_to_index(from_space)];
    console.log("|| Pawn", 1)
    if (from_piece === null) return null;
    const to_piece = board[space.space_to_index(to_space)];
    if (to_piece !== null && from_piece.team === to_piece.team)
        return null;
    console.log("|| Pawn", 2)

    from_piece.data.extra.can_en_passant = false;

    const move_response = {
        from_space: from_space,
        to_space: to_space,
    };
    // number / row
    const rank_diff = space.from_rank(to_space.rank) - space.from_rank(from_space.rank);

    // letter / col
    const file_diff = space.from_file(to_space.file) - space.from_file(from_space.file);

    console.log("|| Pawn Rank:", rank_diff, "File:", file_diff)
    const abs_rank_diff = Math.abs(rank_diff);
    const abs_file_diff = Math.abs(file_diff);

    if (rank_diff === 0) return null; // same row / didn't move up
    if (abs_file_diff > 1 || abs_rank_diff > 2) return null;
    console.log("|| Pawn", 3)
    // black move => from - to => 7 - 6 => 1 > 0
    if ((rank_diff > 0) === (from_piece.team === "black")) return null;
    console.log("|| Pawn", 4)

    if (abs_file_diff === 1) { // moved over one
        console.log("|| Pawn", 5)
        if (abs_rank_diff !== 1) return null; // didn't move up one
        console.log("|| Pawn", 6)
        if (to_piece !== null) { // Kill
            return move_response;
        } else {
            console.log("|| Pawn", 7)
            // En passant
            const en_passant_space = {
                rank: from_space.rank,
                file: space.to_file(space.from_file(from_space.file) + file_diff)
            }
            const en_passant_response = {
                from_space: en_passant_space,
                to_space: null,
            };
            console.log("|| Pawn", 8)

            const en_passant_piece = board[space.space_to_index(en_passant_space)];
            console.log(en_passant_space, en_passant_piece, en_passant_piece.team === from_piece.team);
            if (en_passant_piece === null ||
                en_passant_piece.team === from_piece.team ||
                en_passant_piece.name !== "P" ||
                !en_passant_piece.data.extra.can_en_passant) {
                return null;
            } else {
                console.log("|| Pawn", 9)
                return [
                    move_response,
                    en_passant_response,
                ];
            }
        }
    }
    console.log("|| Pawn", 10)
    if (abs_file_diff === 0) { // same col
        console.log("|| Pawn", 11)
        if (to_piece !== null) return null;
        if (abs_rank_diff === 2) { // moved up two
            console.log("|| Pawn", 12)
            if (from_piece.data.moves > 0) return null;
            from_piece.data.extra.can_en_passant = true;
        }
    }
    console.log("|| Pawn", 13)
    return move_response;
}

export {
    attack,
}