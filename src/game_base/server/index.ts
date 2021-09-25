import express from 'express';
const app = express();

import http from 'http';
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { NEXT_FRAME } from '../util';
const io = new Server(server);

import { Room, World, CommandData } from './types';

app.use(express.static(__dirname + '/client'));

const logging = 3;
function log(msg: any, level: number = 1) {
    if (logging < level) return;
    console.log(msg);
}

let world: World;
let cur_game: string;
let running = false;
let animate_timeout: NodeJS.Timeout | null = null;
let start_time = 0;
let next_frame = 0;
type Swap = (game: string) => void;
let swap: Swap;

function set_world(new_world: World) {
    world = new_world;
}

function set_swap(new_swap: Swap) {
    swap = new_swap;
}

function start() {
    running = true;
    last_time = (new Date()).valueOf();
    start_time = last_time;
    next_frame = start_time;
    animate();
}

function stop() {
    running = false;
    if (animate_timeout) clearTimeout(animate_timeout);
}

function animate() {
    if (!running) return;
    const now = (new Date()).valueOf();
    world.animate(now);
    if (now - last_time >= update_time) {
        last_time = now;
        update_world()
    }
    next_frame += NEXT_FRAME;
    animate_timeout = setTimeout(animate, next_frame - now);
}

const update_time = 20_000;
let last_time = 0;

io.on('connection', (socket) => {
    socket.on("identify", (t) => {
        log("connected to " + t);
        if (t == Room.Canvas)
            init_canvas_socket(socket);
        if (t == Room.Control)
            init_command_socket(socket);
    });
    if (cur_game) socket.emit("swap", cur_game)
});

function init_canvas_socket(socket: Socket) {
    log("init_canvas_socket: " + socket.id, 2);
    socket.join(Room.Canvas);
    update_world();
}

function init_command_socket(socket: Socket) {
    log("init_command_socket: " + socket.id, 2);
    socket.join(Room.Control);
    socket.on("command", command);
    socket.on("swap", (game: string) => {
        io.emit('swap', game);
        cur_game = game;
        swap(game);
    });
}

function update_world() {
    if (!running) return;
    log("updating world", 2)
    send_sync_update(io);
}

function send_sync_update(socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
    io.to(Room.Canvas).emit("world", world.toJSON());
}

function command(data: CommandData) {
    if (!running) return;
    log("command: ", 3);
    log(data, 3);
    log("", 3);
    world.do_command(data);
    io.to(Room.Canvas).emit("command", data)
}

server.listen(3000, () => {
    log('listening on *:3000');
});

export {
    start,
    stop,
    set_world,
    set_swap,
}