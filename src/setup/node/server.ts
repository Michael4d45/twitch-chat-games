import * as Server from "../../game_base/server";
import { get_world } from "..";
import { World } from "../../game_base/server/types";

Server.set_swap(swap_game);

function start(world: World) {
    Server.set_world(world);
    Server.start();
}

function stop() {
    Server.stop()
}

function swap(world: World) {
    stop();
    start(world);
}

function swap_game(game: string) {
    console.log("Swapping to " + game + "!");
    const world = get_world(game);
    if(world) swap(world);
}