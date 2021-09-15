import tmi from "tmi.js";
import { Command } from "../types";
import { set_commands } from "./Commands";
import { Twitch, Control } from "../../../game_base/control/types"

let added_callbacks = false;

function start(control: Control, twitch: Twitch) {
    set_commands(control.set_command);
    twitch.set_help(`!join, !kill, !shoot, !move-{up, down, left, right}`);

    if (!added_callbacks) {
        control.add_callback(Command.Join, (channel: string, username: string, client: tmi.Client) => {
            client.say(channel, `${username} joined!`);
        });
        control.add_callback(Command.Kill, (channel: string, username: string, client: tmi.Client) => {
            client.say(channel, `${username} left!`);
        });
        added_callbacks = true;
    }

    twitch.start();
}

export {
    start
}