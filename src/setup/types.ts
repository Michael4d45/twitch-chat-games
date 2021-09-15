import { Canvas } from "../game_base/client/types";
import { Control, Twitch, Web } from "../game_base/control/types";
import { World } from "../game_base/server/types";

interface TwitchSetup {
    start: (control: Control, twitch: Twitch) => void;
}

interface WebSetup {
    start: (control: Control, web: Web) => void
}

interface CanvasSetup {
    set_canvas: (new_canvas: Canvas) => void,
    World: World,
}

interface Game {
    name: string
    twitch: TwitchSetup
    world: World
    web: WebSetup
    client: CanvasSetup
}

export {
    Game,
    TwitchSetup,
    WebSetup,
    CanvasSetup,
}