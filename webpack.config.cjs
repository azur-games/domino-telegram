const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = (_env, argv) => ({
    entry: './src/app.ts',
    devtool: argv.mode === "production" ? false : "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets'},
                {from: "html", to: ""}
            ]
        })
    ]
});