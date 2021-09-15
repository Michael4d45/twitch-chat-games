
import { Command } from "../types";
import { Direction } from "../../../game_base/game/Pos";
import { HandleCommandData, SetCommand } from "../../../game_base/control/types";

interface HandleShootyCommandData extends HandleCommandData {
    command: Command
}

const commands: Array<HandleShootyCommandData> = [
    {
        callbacks: [],
        args: [],
        command: Command.Join
    },
    {
        callbacks: [],
        args: [],
        command: Command.Kill
    },
    {
        callbacks: [],
        args: [],
        command: Command.Shoot
    },
    {
        callbacks: [],
        args: [{
            key: 'direction',
            in: [Direction.Up, Direction.Down, Direction.Left, Direction.Right]
        }],
        command: Command.Move
    }
];

function set_commands(set_command: SetCommand) {
    commands.forEach(command => set_command(command.command, command));
}

export {
    commands,
    set_commands,
}
