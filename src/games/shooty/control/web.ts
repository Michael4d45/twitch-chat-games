import { Command } from "../types";
import { commands, set_commands } from "./Commands";
import { CommandHandler, Control, Web } from "../../../game_base/control/types";
import { Direction } from "../../../game_base/game/Pos";

let command_handler: CommandHandler;

function start(control: Control, web: Web) {
    command_handler = control.command_handler;
    set_commands(control.set_command)

    web.add_controls(commands);
    web.add_button('random', random);
    web.add_button('clear', clear);
}

const IDs = 15_000;
let playerTimeout: NodeJS.Timeout;

function randomDirection() {
    switch (Math.floor(Math.random() * 4)) {
        case 0: return Direction.Up;
        case 1: return Direction.Down;
        case 2: return Direction.Left;
        default: return Direction.Right;
    }
}

function randomId() {
    return `${Math.floor(Math.random() * IDs)}`
}

let running = false;

function random() {
    running = !running;
    if (running) {
        for (let i = 0; i < IDs; i++)
            command_handler(i.toString(), Command.Join)
        move_player()
    } else {
        clearTimeout(playerTimeout);
    }
}

function move_player() {
    if (!running) return;
    for (let i = 0; i < 200; i++)
        command_handler(randomId(), Command.Move, [randomDirection()])
    playerTimeout = setTimeout(move_player, Math.random() * 4000);
};

function clear() {
    running = false;
    for (let i = 0; i < IDs; i++)
        command_handler(i.toString(), Command.Kill);
}

export {
    start
}