enum Command {
    Join = "join",
    Put = "put",
    Kill = "kill",
}

enum Team {
    X = "X",
    O = "O"
}


enum Space {
    a1 = "a1", a2 = "a2", a3 = "a3",
    b1 = "b1", b2 = "b2", b3 = "b3",
    c1 = "c1", c2 = "c2", c3 = "c3",
}

enum Piece {
    X = "X",
    O = "O",
    empty = ""
}

const team_to_piece: Map<Team, Piece> = new Map([
    [Team.O, Piece.O],
    [Team.X, Piece.X]
]);

const piece_to_team: Map<Piece, Team> = new Map([
    [Piece.O, Team.O],
    [Piece.X, Team.X]
]);

const space_to_index: Map<Space, number> = new Map([
    [Space.a1, 0], [Space.a2, 1], [Space.a3, 2],
    [Space.b1, 3], [Space.b2, 4], [Space.b3, 5],
    [Space.c1, 6], [Space.c2, 7], [Space.c3, 8]
])

export {
    Command,
    Team,
    Space,
    Piece,
    team_to_piece,
    space_to_index,
    piece_to_team,
}