import tmi from "tmi.js";
import { Callback, Control, Twitch } from "../../../game_base/control/types";
import { Command } from "../types";
import { set_commands } from "./Commands";

let added_callbacks = false;

const join_callback: Callback = (channel: string, username: string, client: tmi.Client) => {
    console.log("callback", "join", username);
    client.say(channel, `${username} joined!`);
}

function add_callback(control: Control, command: Command, callback: Callback) {
    control.add_callback(command, callback);
}

function start(control: Control, twitch: Twitch) {
    set_commands(control.set_command);
    twitch.set_help(`!join-{Black White}, !leave, !move-{a1}-{a1}`);

    if (!added_callbacks) {
        console.log("adding callback join")
        add_callback(control, "join", join_callback);
        added_callbacks = true;
    }

    twitch.start();
}

export {
    start
}