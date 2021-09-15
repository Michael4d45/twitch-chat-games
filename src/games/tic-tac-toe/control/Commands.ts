
import { Command, Team, Space } from "../types";
import { HandleCommandData, SetCommand } from "../../../game_base/control/types";

interface HandleTicTacToeCommandData extends HandleCommandData {
    command: Command
}

const commands: Array<HandleTicTacToeCommandData> = [
    {
        callbacks: [],
        args: [{
            key: 'team',
            in: [Team.X, Team.O]
        }],
        command: Command.Join
    },
    {
        callbacks: [],
        args: [],
        command: Command.Kill
    },
    {
        callbacks: [],
        args: [{
            key: 'space',
            in: [
                Space.a1, Space.a2, Space.a3,
                Space.b1, Space.b2, Space.b3,
                Space.c1, Space.c2, Space.c3,
            ]
        }],
        command: Command.Put
    }
];

function set_commands(set_command: SetCommand) {
    commands.forEach(command => set_command(command.command, command));
}

export {
    commands,
    set_commands,
}
