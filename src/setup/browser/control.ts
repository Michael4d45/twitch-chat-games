import * as Web from "../../game_base/control/web";
import * as Control from "../../game_base/control/command_handler";
import { games, get_web } from "..";
import { WebSetup } from "../types";

Web.set_command_handler(Control);
Control.set_swap(swap_game);

games.forEach((game, name) => {
    Web.add_game(name);
});

function start(game: WebSetup) {
    game.start(Control, Web);
}

function stop() {
    Web.stop();
    Control.clear_commands();
}

function swap(game: WebSetup) {
    stop()
    start(game);
}

function swap_game(game: string) {
    console.log("Swapping to " + game + "!");
    const web = get_web(game);
    if (web) swap(web);
}