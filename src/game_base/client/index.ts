import { io, Socket } from "socket.io-client";
import { Room, World, CommandData } from "../server/types"
import * as CanvasWorld from "./CanvasWorld";

let world: World;
let running = false;

function start() {
    running = true;
    animate(0);
}

function stop() {
    running = false;
}

function set_world(new_world: World) {
    world = new_world;
}

const socket: Socket = io("http://localhost:3000");

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

let FPS = 30;
let lastTimestamp = 0;
let time = 0;

function animate(timestamp: number) {
    if (running) requestAnimationFrame(animate);
    if (timestamp - lastTimestamp < 1000 / FPS) return;
    time = (new Date()).valueOf()

    world.animate(time);
    CanvasWorld.draw();

    lastTimestamp = timestamp;
}

socket.emit("identify", Room.Canvas);

export {
    start,
    stop,
    set_world,
    CanvasWorld,
    set_swap,
}