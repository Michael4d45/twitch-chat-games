import { CommandData } from "../../../game_base/server/types";
import { Command } from "../types";
import Fish, { FishData } from "./fish";

interface WorldData {
    fishes: Array<FishData>
    frame: number
}

let fishes: Array<Fish> = [];
let frame = 0;

let max_fishes = 10;

for (let i = 0; i < max_fishes; i++) {
    fishes.push(new Fish(i))
}

function do_command(command_data: CommandData) {
    const id = command_data.id;
    const data = command_data.data;
    const command = <Command>command_data.command;
    switch (command) {
        case "feed":
            break;
    }
}

function animate(timestamp: number) {
    frame++;
    for(let i = 0; i < max_fishes; i++) {
        const fish = fishes[i];
        if(fish.is_dead()) {
            fish.renew()
        } else {
            fish.move()
        }
    }
}

function toJSON(): WorldData {
    const fish_data: Array<FishData> = [];
    fishes.forEach(fish => {
        fish_data.push(fish.toJSON())
    });
    return {
        fishes: fish_data,
        frame: frame,
    }
}

function fromJSON(data: WorldData) {
    fishes = [];
    data.fishes.forEach(fish => {
        fishes.push(Fish.fromJSON(fish));
    });
    console.log(data.frame - frame)
    frame = data.frame;
}

export {
    WorldData,
    toJSON,
    fromJSON,
    animate,
    do_command,
    fishes,
}