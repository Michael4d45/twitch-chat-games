import { io, Socket } from "socket.io-client";
import { Room, World, CommandData } from "../server/types"
import { NEXT_FRAME } from "../util";
import * as CanvasWorld from "./CanvasWorld";

let world: World;
let running = false;

let animate_timeout: NodeJS.Timeout;
let last_time = 0;
let start_time = 0;
let next_frame = 0;

function start() {
    running = true;

    last_time = (new Date()).valueOf();
    start_time = last_time;
    next_frame = start_time;

    animate(0);
    animate_world();
}

function stop() {
    running = false;
    if (animate_timeout) clearTimeout(animate_timeout);
}

function set_world(new_world: World) {
    world = new_world;
}


if (!(process.env.URL))
    throw("You must set the url in the .env file");

const socket: Socket = io(process.env.URL);

socket.on("command", (command_data: CommandData) => {
    if (!running) return;
    world.do_command(command_data)
});

socket.on("world", (data) => {
    if (!running) return;
    console.log(data)
    world.fromJSON(data)
})

type Swap = (game: string) => void;
let swap: Swap;

function set_swap(new_swap: Swap) {
    swap = new_swap;
}

socket.on("swap", (game: string) => {
    if (!game) throw("No swap set");
    swap(game);
});

function animate(timestamp: number) {
    if (running) requestAnimationFrame(animate);
    CanvasWorld.draw();
}

function animate_world() {
    if (!running) return;
    const now = (new Date()).valueOf();

    world.animate(now);

    next_frame += NEXT_FRAME;
    
    animate_timeout = setTimeout(animate_world, next_frame - now);
}

socket.emit("identify", Room.Canvas);

export {
    start,
    stop,
    set_world,
    CanvasWorld,
    set_swap,
}