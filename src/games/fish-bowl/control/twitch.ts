import { Control, Twitch } from "../../../game_base/control/types";
import { set_commands } from "./Commands";

function start(control: Control, twitch: Twitch) {
    set_commands(control.set_command);
    twitch.set_help(`!join-{X, O}, !kill, !put-{a1, a2, a3, b1, b2, b3, c1, c2, c3}`);

    twitch.start();
}

export {
    start
}