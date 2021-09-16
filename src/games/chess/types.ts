type Command = "Join" | "Leave" | "Move";

type Team = "White" | "Black";

type Rows = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
type Cols = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"

type Space = {
    row: Rows, 
    col: Cols
}

type PieceName = "K" | "Q" | "B" | "N" | "R" | "P"

interface Piece {
    name: PieceName
    team: Team
}

function space_to_index(space: Space) {
    const col = Number(space.col) - 1
    const row = space.row.charCodeAt(0) - "a".charCodeAt(0)

    return (col * 8 + row);
}

export {
    Command,
    Team,
    Space,
    Piece,
    PieceName,
    space_to_index,
}