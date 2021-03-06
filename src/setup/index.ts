import { Game } from "./types";
import * as Shooty from "../games/shooty";
import * as TicTacToe from "../games/tic-tac-toe";
import * as Chess from "../games/chess";

let games: Map<string, Game> = new Map([
    [Shooty.name, <Game>Shooty],
    [TicTacToe.name, TicTacToe],
    [Chess.name, Chess],
]);

function get_world(name: string) {
    return games.get(name)?.world;
}

function get_twitch(name: string) {
    return games.get(name)?.twitch;
}

function get_web(name: string) {
    return games.get(name)?.web;
}

function get_canvas(name: string) {
    return games.get(name)?.client;
}

export {
    games,
    get_world,
    get_twitch,
    get_web,
    get_canvas,
}