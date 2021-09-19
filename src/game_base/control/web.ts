import { CommandHandler, Control, HandleCommandData, SwapGame } from "./types";

const username = <HTMLInputElement>document.getElementById('username');
const games = <HTMLSelectElement>document.getElementById('games');
document.getElementById('switch_game')?.addEventListener('click', swap_game_command)

const buttons = <HTMLDivElement>document.getElementById('buttons');

function add_game(name: string) {
    const option = document.createElement("option")
    option.setAttribute("value", name)
    option.innerText = name;
    games.append(option);
}

function add_button(command: string, callback: () => void) {
    const button = document.createElement("button");
    button.innerText = command;
    button.addEventListener('click', callback);
    buttons.append(button)
}

function stop() {
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
}

let command_handler: CommandHandler;
let swap_game: SwapGame;

function set_command_handler(control: Control) {
    command_handler = control.command_handler;
    swap_game = control.swap_game;
}

function swap_game_command() {
    if (!swap_game)
        throw ("No swap game!")
    const game = games.value;
    swap_game(game);
}

function add_controls(commands: Array<HandleCommandData>) {
    if (!command_handler)
        throw (" You must set the command handler! ");

    commands.forEach(command_data => {
        if (command_data.args.length == 0) {
            add_button(command_data.command, () => {
                command_handler(username.value, command_data.command)
            });
        } else {
            let args: Array<Array<string>> = [];
            let start = 0;
            let end = 0;
            for (let i = 0; i < command_data.args.length; i++) {
                const in_array = command_data.args[i].in;
                if (in_array) {
                    end = args.length;
                    in_array.forEach(el => {
                        if (end == 0)
                            args.push([el]);
                        else {
                            for (let j = start; j < end; j++) {
                                const cur_arg = [...args[j]];
                                cur_arg.push(el);
                                args.push(cur_arg);
                            }
                        }
                    });
                    start = end;
                }
            }
            args.forEach(command_args => {
                let name = <string>command_data.command;
                command_args.forEach(element => {
                    name = `${name}-${element}`
                });
                add_button(name, () => {
                    command_handler(username.value, command_data.command, command_args)
                });
            })
        }
    })
}

export {
    add_button,
    username,
    add_controls,
    set_command_handler,
    stop,
    add_game,
}

