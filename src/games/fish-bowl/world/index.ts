import { CommandData } from "../../../game_base/server/types";
import { Command } from "../types";

interface WorldData {
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
}

function toJSON(): WorldData {
    return {
    }
}

function fromJSON(data: WorldData) {
}

export {
    WorldData,
    toJSON,
    fromJSON,
    animate,
    do_command,
}