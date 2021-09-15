import tmi from "tmi.js";
import { Control, Twitch } from "../../../game_base/control/types";
import { Command } from "../types";
import { set_commands } from "./Commands";

let added_callbacks = false;

function start(control: Control, twitch: Twitch) {
    set_commands(control.set_command);
    twitch.set_help(`!join-{X, O}, !kill, !put-{a1, a2, a3, b1, b2, b3, c1, c2, c3}`);

    if (!added_callbacks) {
        control.add_callback(Command.Join, async (channel: string, username: string, client: tmi.Client) => {
            console.log("callback", Command.Join, channel, username);
            let message = await client.say(channel, `${username} joined!`);
            console.log(message);
        });
        added_callbacks = true;
    }

    twitch.start();
}

export {
    start
}