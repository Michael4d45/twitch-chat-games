import * as twitch from "../../game_base/control/twitch";
import * as Control from "../../game_base/control/command_handler";
import { TwitchSetup } from "../types";
import { get_twitch, games } from "..";

twitch.set_command_handler(Control);

Control.set_swap(swap_game);

games.forEach((game, name) => {
    twitch.add_game(name);
});

function start(twitch_control: TwitchSetup) {
    twitch_control.start(Control, twitch);
}

function stop() {
    twitch.stop();
    Control.clear_commands()
}

function swap(twitch_control: TwitchSetup) {
    stop();
    start(twitch_control);
}

function swap_game(game: string) {
    console.log("Swapping to " + game + "!");
    const twitch_control = get_twitch(game);
    if (twitch_control) swap(twitch_control);
}