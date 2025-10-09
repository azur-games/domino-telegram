const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = (_env, argv) => ({
    entry: './src/app.ts',
    mode: argv.mode || 'production',
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
    optimization: {
        usedExports: true,
        sideEffects: false,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                pixi: {
                    test: /[\\/]node_modules[\\/](pixi\.js|@pixi|pixi-spine|pixi3d)[\\/]/,
                    name: 'pixi',
                    chunks: 'all',
                    priority: 10,
                },
            },
        },
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
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