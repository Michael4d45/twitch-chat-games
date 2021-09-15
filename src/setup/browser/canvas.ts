import * as Client from "../../game_base/client";

import { get_canvas } from "..";
import { CanvasSetup } from "../types";

Client.set_swap(swap_game);

function start(game: CanvasSetup) {
    game.set_canvas(Client.CanvasWorld);
    Client.set_world(game.World);

    Client.start();
}

function stop() {
    Client.stop()
    Client.CanvasWorld.clear_draws();
}

function swap(game: CanvasSetup) {
    stop()
    start(game);
}

function swap_game(game: string) {
    console.log("Swapping to " + game + "!");
    const web = get_canvas(game);
    if (web) swap(web);
}