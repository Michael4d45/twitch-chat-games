import Pos from "../game/Pos";

interface Canvas {
    draw_text: (text: string, pos: Pos, color: string, size?: number) => void;
    draw_hook: (callback: () => void) => void;
    draw_square_at: (pos: Pos, color: string, stroke?: boolean) => void;
    draw_circle_at: (pos: Pos, color: string, stroke?: boolean, size?: number) => void;
    draw_line: (pos1: Pos, pos2: Pos, color: string, thickness?: number) => void;
    clear_draws: () => void;
    set_scale: (scale: number) => void;
}

export {
    Canvas
}