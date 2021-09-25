import { io, Socket } from "socket.io-client";
import { Room, CommandData } from "../server/types"
import { CommandHandler, HandleCommandData } from "./types"

if (!(process.env.URL))
    throw("You must set the url in the .env file");

const socket: Socket = io(process.env.URL);

socket.emit("identify", Room.Control);

type Swap = (game: string) => void;
let swap: Swap;

function set_swap(new_swap: Swap) {
    swap = new_swap;
}

socket.on("swap", (game: string) => {
    if (!game) throw ("No swap set");
    console.log("swapping to " + game);
    swap(game);
});

function command(data: CommandData) {
    socket.emit("command", data);
}

function swap_game(game: string) {
    console.log("sending swapping to " + game);
    socket.emit("swap", game);
}

const commands: Map<string, HandleCommandData> = new Map();

function clear_commands() {
    commands.clear();
}

function set_command(command_name: string, command_data: HandleCommandData) {
    commands.set(command_name, command_data);
}

function add_callback(command_name: string, callback: Function) {
    console.log("adding callback")
    const command_data = commands.get(command_name);
    if (!command_data) return console.log("nothing happend", command_name, commands);
    command_data.callbacks.push(callback);
    console.log(command_data)
}

const command_handler: CommandHandler = (username: string, command_name: string, command_arguments: Array<string | number> = [], callback_args: Array<any> = []) => {
    console.log(username, command_name, 1);
    const command_ws_data: CommandData = {
        id: username,
        command: ""
    }

    const command_data = commands.get(command_name);
    console.log(username, command_name, command_data, commands, 2);
    if (!command_data) return;
    console.log(username, command_name, 3);

    command_ws_data.command = command_data.command;
    if (command_data.args.length > 0) {
        command_ws_data.data = {};
        const passes_rules = command_data.args.every((arg, i) => {
            const key = arg.key;
            const required = arg.required === undefined || arg.required === true;
            if (required && (command_arguments[i] === undefined || command_arguments[i] === null))
                return false;
            if (arg.in) {
                const not_in = arg.in.every(test => {
                    return test !== command_arguments[i];
                });
                if (not_in) return false;
            }
            command_ws_data.data[key] = command_arguments[i]
            return true;
        });
        if (!passes_rules) return;
    } else {
        if (command_arguments.length > 0) return;
    }

    if (command_ws_data.command !== "")
        command(command_ws_data);

    console.log(username, command_name, 3);
    command_data.callbacks.forEach(callback => callback(...callback_args))
}

export {
    command_handler,
    add_callback,
    set_command,
    clear_commands,
    swap_game,
    set_swap,
}