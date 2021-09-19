import { Command, teams, spaces } from "../types";
import { HandleCommandData, SetCommand } from "../../../game_base/control/types";

interface HandleTicTacToeCommandData extends HandleCommandData {
    command: Command
}

const commands: Array<HandleTicTacToeCommandData> = [
    {
        callbacks: [],
        args: [{
            key: 'team',
            in: teams
        }],
        command: "join"
    },
    {
        callbacks: [],
        args: [],
        command: "leave"
    },
    {
        callbacks: [],
        args: [{
            key: 'from',
            in: spaces
        }, {
            key: 'to',
            in: spaces
        }],
        command: "move"
    }
];

function set_commands(set_command: SetCommand) {
    commands.forEach(command => set_command(command.command, command));
}

export {
    commands,
    set_commands,
    spaces,
}
