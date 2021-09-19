import tmi from "tmi.js"

type CommandHandler = (username: string, command_name: string, command_arguments?: Array<string>, callback_args?: Array<any>) => void;
type Callback = (channel: string, username: string, client: tmi.Client) => void;
type AddCallback = (command: string, callback: Callback) => void;
type SetCommand = (command: string, callback: HandleCommandData) => void;
type SwapGame = (game: string) => void;

interface ArgData {
    key: string
    in?: Array<string>
    required?: boolean
}

interface HandleCommandData {
    callbacks: Array<Function>
    args: Array<ArgData>
    command: string
}

interface Control {
    command_handler: CommandHandler
    set_command: SetCommand
    add_callback: AddCallback
    swap_game: SwapGame
}

interface Twitch {
    set_command_handler: (control: Control) => void
    set_help: (help: string) => void
    start: () => void
    stop: () => void
}


type AddControls = (commands: Array<HandleCommandData>) => void;
type AddButton = (command: string, callback: () => void) => void;

interface Web {
    add_controls: AddControls
    add_button: AddButton
}

export {
    SwapGame,
    SetCommand,
    CommandHandler,
    AddCallback,
    Callback,
    Twitch,
    Web,
    Control,
    ArgData,
    HandleCommandData,
}