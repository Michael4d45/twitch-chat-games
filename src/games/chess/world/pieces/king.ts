import * as space from "../space";
import { Board } from "../types";

function attack(from_space: space.Space, to_space: space.Space, board: Board) {
    const from_piece = board[space.space_to_index(from_space)];
    const to_piece = board[space.space_to_index(to_space)];
    if (to_piece !== null && from_piece !== null
        && from_piece.team === to_piece.team)
        return null;
    const move_response = {
        from_space: from_space,
        to_space: to_space,
    };
    const rank_diff = space.from_rank(to_space.rank) - space.from_rank(from_space.rank);
    const file_diff = space.from_file(to_space.file) - space.from_file(from_space.file);

    if (Math.abs(rank_diff) > 1 || Math.abs(file_diff) > 1) return null;

    return move_response;
}

export {
    attack,
}