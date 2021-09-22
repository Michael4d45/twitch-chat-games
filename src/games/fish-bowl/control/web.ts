import { set_commands } from "./Commands";
import { CommandHandler, Control, Web } from "../../../game_base/control/types"

let command_handler: CommandHandler;

function start(control: Control, web: Web) {
    command_handler = control.command_handler;
    set_commands(control.set_command)
}

export {
    start
}