type file = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
type rank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
type SpaceName = `${file}${rank}`

type Space = {
    file: file,
    rank: rank
}

function space_to_index(space: Space) {
    const rank = from_rank(space.rank)
    const file = from_file(space.file);

    return <number>to_index(rank, file);
}

function to_index(rank: number, file: number) {
    if(rank < 0 || file < 0 || rank >= 8 || file >= 8) return null;
    return (7 - rank) * 8 + (file);
}

function from_rank(rank: rank) {
    return Number(rank) - 1;
}

function from_file(file: file) {
    return file.charCodeAt(0) - "a".charCodeAt(0);
}

function to_rank(r: number) {
    return <rank>((r + 1).toString())
}

function to_file(f: number) {
    return <file>(String.fromCharCode(f + "a".charCodeAt(0)))
}

function get_space(name: SpaceName): Space {
    return {
        file: <file>name[0],
        rank: <rank>name[1]
    }
}

export {
    file, rank, Space,
    SpaceName,

    space_to_index, to_index,
    from_file, from_rank,
    to_file, to_rank, 

    get_space,
}