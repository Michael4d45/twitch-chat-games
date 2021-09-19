import * as space from "../space";
import { Board, Piece, Team } from "../types";

function get_diagonal_from(s: space.Space, rank_direction: number, file_direction: number, board: Board) {
    rank_direction = Math.sign(rank_direction);
    file_direction = Math.sign(file_direction);
    if (rank_direction === 0 || file_direction === 0) return null;

    let rank = space.from_rank(s.rank);
    let file = space.from_file(s.file);
    let index = space.to_index(rank, file);
    if (index === null) return null;
    let piece = board[index];
    while (true) {
        rank += rank_direction;
        file += file_direction;
        index = space.to_index(rank, file);
        if (index === null) return null;
        piece = board[index];

        if (piece !== null)
            return {
                rank: space.to_rank(rank),
                file: space.to_file(file)
            }
    }
}

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
    const rank_diff = space.from_rank(from_space.rank) - space.from_rank(to_space.rank)
    const file_diff = space.from_file(from_space.file) - space.from_file(to_space.file)

    if(Math.abs(rank_diff) !== Math.abs(file_diff)) return null;

    const s: space.Space | null = get_diagonal_from(from_space, rank_diff, file_diff, board)
    if (s == null)
        return move_response;
    if (s.file >= to_space.file && s.rank >= to_space.rank)
        return move_response;
    
    // there's some piece in the way
    return null;
}

export {
    attack,
}