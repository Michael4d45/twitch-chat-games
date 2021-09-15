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
            for (let i = 0; i < command_data.args.length; i++) {
                const in_array = command_data.args[i].in;
                if (in_array) {
                    const len = args.length;
                    in_array.forEach(el => {
                        if (len == 0)
                            args.push([el]);
                        else {
                            for (let j = 0; j < len; j++) {
                                const cur_arg = args[j];
                                cur_arg.push(el);
                                args.push(cur_arg);
                            }
                        }
                    });
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

