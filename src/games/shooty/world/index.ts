import { CommandData } from "../../../game_base/server/types";
import { Command } from "../types";
import Player, { PlayerData } from "./Player";
import { Direction } from "../../../game_base/util"

interface WorldData {
    players: Array<PlayerData>
    players_with_shots: Array<string>
}

let players: Map<string, Player> = new Map();
let players_with_shots: Map<string, Player> = new Map();

function do_command(command_data: CommandData) {
    const id = command_data.id;
    const data = command_data.data;
    const command = command_data.command;
    switch (command) {
        case Command.Join:
            user_joined(id);
            break;
        case Command.Move:
            const move_data = data;
            user_moved(id, move_data.direction);
            break;
        case Command.Kill:
            user_killed(id);
            break;
        case Command.Shoot:
            user_shot(id)
            break;
    }
}

function user_moved(id: string, direction: Direction) {
    const player = players.get(id);
    if (player)
        move_player(player, direction);
}

function user_joined(id: string) {
    add_player(id, new Player(id));
}

function user_killed(id: string) {
    remove_player(id);
}

function user_shot(id: string) {
    const player = players.get(id);
    if (player) {
        player.shoot();
        players_with_shots.set(player.id, player);
    }
}

function add_player(id: string, player: Player) {
    players.set(id, player);
}

function remove_player(id: string) {
    players.delete(id);
}

function move_player(player: Player, direction: Direction) {
    player.move(direction);
    players.set(player.id, player);
}

function animate(timestamp: number) {
    animate_players();
}

function animate_players() {
    const position_players: any = {};
    if (players_with_shots.size == 0) return;
    players.forEach((player: Player) => {
        player.animate();
        if (!player.shot)
            players_with_shots.delete(player.id)

        const pos = player.pos;
        if (!position_players[pos.x])
            position_players[pos.x] = {};
        if (!position_players[pos.x][pos.y])
            position_players[pos.x][pos.y] = [];
        position_players[pos.x][pos.y].push(player);
    });
    players_with_shots.forEach((player: Player) => {
        const shot = player.shot;
        if (!shot) return;
        const pos = shot.pos;
        if (!position_players[pos.x]) return;
        if (!position_players[pos.x][pos.y]) return;
        const players = position_players[pos.x][pos.y];
        if (players) {
            players.forEach((shot_player: Player) => {
                if (shot_player.id != player.id)
                    user_killed(shot_player.id);
            });
        }
    });
}

function toJSON(): WorldData {
    let player_data: Array<PlayerData> = [];
    let player_shot_data: Array<string> = [];
    players.forEach(player => {
        player_data.push(player.toJSON());
        if (player.shot)
            player_shot_data.push(player.id)
    })
    return {
        players: player_data,
        players_with_shots: player_shot_data,
    }
}

function fromJSON(data: WorldData) {
    players = new Map();
    players_with_shots = new Map();

    data.players.forEach((player: PlayerData) => {
        players.set(player.id, Player.fromJSON(player));
    })
    data.players_with_shots.forEach((id: string) => {
        const player = players.get(id);
        if (player) players_with_shots.set(id, player);
    })
}

export {
    WorldData,
    players,
    toJSON,
    fromJSON,
    animate,
    do_command,
}