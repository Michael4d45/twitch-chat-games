import { CommandData } from "../../../game_base/server/types";
import { Command, Space, Team, Piece, team_to_piece, piece_to_team, space_to_index } from "../types";
import Player, { PlayerData } from "./Player";

interface WorldData {
    players: Array<PlayerData>
    board: Board
    won: Team | null
    won_timer: number
    X_wins: number
    O_wins: number
}

type Board = [
    Piece, Piece, Piece,
    Piece, Piece, Piece,
    Piece, Piece, Piece,
];

let players: Map<string, Player> = new Map();
const empty_board: Board = [
    Piece.empty, Piece.empty, Piece.empty,
    Piece.empty, Piece.empty, Piece.empty,
    Piece.empty, Piece.empty, Piece.empty,
]
let board: Board = [...empty_board];
let won: Team | null = null;
let won_timer = 0;
const won_time_limit = 10 * 1000;

let X_wins = 0;
let O_wins = 0;

function time() {
    return (new Date()).valueOf();
}

function do_command(command_data: CommandData) {
    const id = command_data.id;
    const data = command_data.data;
    const command = command_data.command;
    switch (command) {
        case Command.Join:
            const join_data = data;
            user_joined(id, join_data.team);
            break;
        case Command.Put:
            const move_data = data;
            user_put(id, move_data.space);
            break;
        case Command.Kill:
            user_killed(id);
            break;
    }
}

function user_put(id: string, space: Space) {
    const player = players.get(id);
    if (player)
        put_token(player, space);
}

function user_joined(id: string, team: Team) {
    add_player(id, new Player(id, team));
}

function user_killed(id: string) {
    remove_player(id);
}

function add_player(id: string, player: Player) {
    players.set(id, player);
}

function remove_player(id: string) {
    players.delete(id);
}

function put_token(player: Player, space: Space) {
    if (won !== null) return;
    const piece = <Piece>team_to_piece.get(player.team);
    const index = <number>space_to_index.get(space);
    if (board[index] !== Piece.empty) return;
    board[index] = piece;
    check_win();
}

const winning_spaces = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function check_win() {
    let winner: Team | null = null;
    const not_won = winning_spaces.every(line => {
        const piece = board[line[0]];
        if (piece === Piece.empty) return true;
        winner = <Team>piece_to_team.get(piece);
        return !(piece === board[line[1]] && piece === board[line[2]]);
    });
    if (not_won || winner === null) return;
    won = winner;
    won_timer = won_time_limit;
    if (won === Team.X) X_wins++;
    if (won === Team.O) O_wins++;
}

function animate(timestamp: number) {
    if (won !== null) {
        won_timer -= (1000 / 30);
        if (won_timer <= 0) reset()
    }
}

function reset() {
    won = null;
    board = [...empty_board];
}

function toJSON(): WorldData {
    let player_data: Array<PlayerData> = [];
    players.forEach(player => {
        player_data.push(player.toJSON());
    })
    return {
        players: player_data,
        board: board,
        won: won,
        won_timer: won_timer,
        X_wins: X_wins,
        O_wins: O_wins
    }
}

function fromJSON(data: WorldData) {
    players = new Map();

    data.players.forEach((player: PlayerData) => {
        players.set(player.id, Player.fromJSON(player));
    });
    board = data.board
    won = data.won
    won_timer = data.won_timer
    X_wins = data.X_wins
    O_wins = data.O_wins
}

export {
    WorldData,
    players,
    board,
    toJSON,
    fromJSON,
    animate,
    do_command,
    won,
    won_timer,
    O_wins,
    X_wins,
}