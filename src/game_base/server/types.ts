interface CommandData {
    id: string
    command: string
    data?: any
}

enum Room {
    Canvas = 'canvas',
    Control = 'control',
}

interface World {
    do_command: (command_data: CommandData) => void;
    fromJSON: (world_data: any) => void;
    animate: (timestamp: number) => void;
    toJSON: () => any;
}

export {
    Room,
    World,
    CommandData,
}