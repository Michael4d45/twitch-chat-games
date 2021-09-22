import { Command } from "../types";
import { HandleCommandData, SetCommand } from "../../../game_base/control/types";

interface HandleFishCommandData extends HandleCommandData {
    command: Command
}

const commands: Array<HandleFishCommandData> = [
    {
        callbacks: [],
        args: [],
        command: "feed"
    },
];

function set_commands(set_command: SetCommand) {
    commands.forEach(command => set_command(command.command, command));
}

export {
    commands,
    set_commands,
}
