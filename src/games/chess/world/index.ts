import { CommandData } from "../../../game_base/server/types";
import * as Attack from "./pieces/attack"
import { Command } from "../types";
import Player, { PlayerData } from "./Player";
import { Board, empty_board, Team, Piece, MoveResult, AttackResult } from "./types";
import { get_space, Space, SpaceName, space_to_index } from "./space";

interface WorldData {
    players: Array<PlayerData>
    board: Board
    won: Team | null
    won_timer: number
    Black_wins: number
    White_wins: number
}

let players: Map<string, Player> = new Map();

let board: Board;
function reset_board() {
    board = empty_board();
}
reset_board();

let won: Team | null = null;
let won_timer = 0;
const won_time_limit = 10 * 1000;

let White_wins = 0;
let Black_wins = 0;

type JoinData = {
    team: Team
}

type MoveData = {
    from: SpaceName,
    to: SpaceName
}

function do_command(command_data: CommandData) {
    const id = command_data.id;
    const data = command_data.data;
    const command: Command = <Command>command_data.command;
    switch (command) {
        case "join":
            const join_data = <JoinData>data;
            user_joined(id, join_data.team);
            break;
        case "leave":
            user_left(id);
            break;
        case "move":
            const move_data = <MoveData>data;
            user_moved(id, move_data.from, move_data.to);
            break;
    }
}

function user_moved(id: string, from: SpaceName, to: SpaceName) {
    if (from === undefined || to === undefined) return;
    const player = players.get(id);
    if (player) move_piece(player, get_space(from), get_space(to));
}

function user_joined(id: string, team: Team) {
    add_player(id, new Player(id, team));
}

function user_left(id: string) {
    remove_player(id);
}

function add_player(id: string, player: Player) {
    players.set(id, player);
}

function remove_player(id: string) {
    players.delete(id);
}

function move(result: MoveResult) {
    const from_index = space_to_index(result.from_space);
    if (result.to_space) {
        const to_index = space_to_index(result.to_space);
        board[to_index] = board[from_index];
    }
    const piece = board[from_index];
    if (piece !== null) piece.data.moves += 1
    board[from_index] = null;
}

function move_piece(player: Player, from: Space, to: Space) {
    if (won !== null) return;
    const from_piece = board[space_to_index(from)];
    if (from_piece === null) return;
    if (from_piece.team !== player.team) return;

    const move_result: AttackResult = Attack.attack(from_piece, from, to, board);
    if (move_result === null) return;
    if (Array.isArray(move_result))
        move_result.forEach(move);
    else
        move(move_result)

    check_win();
}

function check_win() {
    let black_win = true;
    let white_win = true;
    for (let i = 0; i < 64; i++) {
        const piece = board[i];
        if (piece !== null && piece.name == 'K') {
            if (piece.team === 'white') black_win = false;
            if (piece.team === 'black') white_win = false;
        }
    }
    if (!white_win && !black_win) return;
    won_timer = won_time_limit;
    if(black_win) {
        Black_wins++;
        won = "black";
    }
    if(white_win) {
        White_wins++;
        won = "white";
    }
}

function animate(timestamp: number) {
    if (won !== null) {
        won_timer -= (1000 / 30);
        if (won_timer <= 0) reset()
    }
}

function reset() {
    won = null;
    reset_board();
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
        White_wins: White_wins,
        Black_wins: Black_wins
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
    White_wins = data.White_wins
    Black_wins = data.Black_wins
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
    White_wins,
    Black_wins,
}
