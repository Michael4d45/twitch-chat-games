import { Team } from "../types";

export interface PlayerData {
    id: string
    team: Team
}

export default class Player {
    id: string;
    team: Team;

    constructor(id: string, team: Team) {
        this.id = id;
        this.team = team;
    }

    toJSON(): PlayerData {
        return {
            id: this.id,
            team: this.team
        }
    }

    static fromJSON(player: PlayerData) {
        return new Player(player.id, player.team);
    }
}