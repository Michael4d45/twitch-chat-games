import tmi from "tmi.js";
import { CommandHandler, Control, SwapGame } from "./types"

const COMMAND_CHAR = "!";
const COMMAND_SEPARATOR = "-";

let running = false;

let command_handler: CommandHandler;
let swap_game: SwapGame;
let help = "";
const games: Array<string> = [];

function set_help(new_help: string) {
    help = new_help;
}

function set_command_handler(control: Control) {
    command_handler = control.command_handler;
    swap_game = control.swap_game;
}

function swap_game_command(game: string) {
    if (!swap_game)
        throw ("No swap game!")
    swap_game(game);
}

function add_game(game: string) {
    games.push(game);
}

function has_game(game: string) {
    return !games.every(g => { return g != game });
}

function games_list() {
    let list = "";
    games.forEach(game => { list = `${list} ${game}` });
    return list;
}

function stop() {
    running = false;
}

function start() {
    if (!command_handler)
        throw (" You must set a command handler! ");
    running = true;
}

if (!(process.env.TWITCH_CHANNEL && process.env.TWITCH_USER && process.env.TWITCH_OAUTH))
    throw (" You must set up your .env file to include TWITCH_{USER, CHANNEL, OAUTH}");

const options = {
    identity: {
        username: process.env.TWITCH_USER,
        password: process.env.TWITCH_OAUTH
    },
    channels: [
        process.env.TWITCH_CHANNEL
    ]
};

const client = new tmi.client(options);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel: string, user_state: tmi.ChatUserstate, message: string, self: boolean) {
    if (self) return; // Ignore messages from the bot
    if (!user_state.username) return;
    const username = user_state.username;
    // Remove whitespace from chat message
    const trimmed_message = message.trim();
    if (trimmed_message.length == 0 || trimmed_message[0] != COMMAND_CHAR) return;
    const command_arguments = trimmed_message.slice(1).split(COMMAND_SEPARATOR);
    const command_name = command_arguments.shift();
    if (!command_name) return;

    if (command_name === 'play') {
        if (command_arguments.length !== 1) return;
        const game = command_arguments[0]
        if (has_game(game)) {
            client.say(channel, "Switching to " + game);
            swap_game_command(game)
        } else {
            client.say(channel, "We have " + games_list())
        }
        return;
    }

    if (command_name === 'help') {
        client.say(channel, `!help, !play-{${games_list()}}, ${help}`);
        return;
    }

    if (!running) {
        client.say(channel, "No game set");
        return;
    }

    const callback_args = [channel, username, client];

    command_handler(username, command_name, command_arguments, callback_args)
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(address: string, port: number) {
    console.log(`* Connected to ${address}:${port}`);
}


export {
    start,
    stop,
    set_help,
    set_command_handler,
    add_game,
};

