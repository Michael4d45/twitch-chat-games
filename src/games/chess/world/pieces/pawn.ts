import * as space from "../space";
import { Board } from "../types";

function attack(from_space: space.Space, to_space: space.Space, board: Board) {
    const from_piece = board[space.space_to_index(from_space)];
    
    if (from_piece === null) return null;
    const to_piece = board[space.space_to_index(to_space)];
    if (to_piece !== null && from_piece.team === to_piece.team)
        return null;
        

    from_piece.data.extra.can_en_passant = false;

    const move_response = {
        from_space: from_space,
        to_space: to_space,
    };
    // number / row
    const rank_diff = space.from_rank(to_space.rank) - space.from_rank(from_space.rank);

    // letter / col
    const file_diff = space.from_file(to_space.file) - space.from_file(from_space.file);

    const abs_rank_diff = Math.abs(rank_diff);
    const abs_file_diff = Math.abs(file_diff);

    if (rank_diff === 0) return null; // same row / didn't move up
    if (abs_file_diff > 1 || abs_rank_diff > 2) return null;
    
    // black move => from - to => 7 - 6 => 1 > 0
    if ((rank_diff > 0) === (from_piece.team === "black")) return null;

    if (abs_file_diff === 1) { // moved over one
        if (abs_rank_diff !== 1) return null; // didn't move up one
        if (to_piece !== null) { // Kill
            return move_response;
        } else {
            // En passant
            const en_passant_space = {
                rank: from_space.rank,
                file: space.to_file(space.from_file(from_space.file) + file_diff)
            }
            const en_passant_response = {
                from_space: en_passant_space,
                to_space: null,
            };

            const en_passant_piece = board[space.space_to_index(en_passant_space)];
            if (en_passant_piece === null ||
                en_passant_piece.team === from_piece.team ||
                en_passant_piece.name !== "P" ||
                !en_passant_piece.data.extra.can_en_passant) {
                return null;
            } else {
                return [
                    move_response,
                    en_passant_response,
                ];
            }
        }
    }
    if (abs_file_diff === 0) { // same col
        if (to_piece !== null) return null;
        if (abs_rank_diff === 2) { // moved up two
            if (from_piece.data.moves > 0) return null;
            from_piece.data.extra.can_en_passant = true;
        }
    }
    return move_response;
}

export {
    attack,
}