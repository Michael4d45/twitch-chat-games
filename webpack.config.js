const path = require('path');
const nodeExternals = require('webpack-node-externals');

const module_config = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ],
};

const resolve_config = {
    extensions: ['.tsx', '.ts', '.js'],
};

const server_config = {
    entry: './src/setup/node/server.ts',
    target: "node",
    externals: [nodeExternals()],
    module: module_config,
    resolve: resolve_config,
    output: {
        filename: 'server/server.js',
        path: path.resolve(__dirname, 'build'),
    },
};

const client_config = {
    entry: './src/setup/browser/canvas.ts',
    module: module_config,
    resolve: resolve_config,
    output: {
        filename: 'server/client/app.js',
        path: path.resolve(__dirname, 'build'),
    },
};

const control_config = {
    entry: './src/setup/browser/control.ts',
    module: module_config,
    resolve: resolve_config,
    output: {
        filename: 'server/client/control.js',
        path: path.resolve(__dirname, 'build'),
    },
};

const twitch_config = {
    entry: './src/setup/node/twitch.ts',
    target: "node",
    externals: [nodeExternals()],
    module: module_config,
    resolve: resolve_config,
    output: {
        filename: 'twitch/twitch.js',
        path: path.resolve(__dirname, 'build'),
    },
}

module.exports = [
    server_config,
    client_config,
    control_config,
    twitch_config
]