const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";
const BASE_DIRECTORY = path.resolve('./');

const {
    entryFile, srcJsPath, portToListen, outputPath
} = require("../utils.js");

module.exports = () => ({
    mode: 'development',
    entry: {
        [entryFile]: path.join(BASE_DIRECTORY, './src/js/index.js')
    },

    output: {
        filename: (module) =>
            ((isProduction && module.chunk.name.indexOf("main") === -1) ?
                "js/[name].[contenthash].js" : "js/[name].js"),
        chunkFilename: isProduction ? "js/[name].[contenthash].js" : "js/[name].js",
        path: outputPath
    },

    optimization: {
        runtimeChunk: 'single'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            js: path.resolve(path.resolve(__dirname, "../../src/js")),
            scss: path.resolve(path.resolve(__dirname, "../../src/scss"))
        }
    },

    devtool: 'source-map',
    devServer: {
        static: {
            directory: outputPath
        },
        devMiddleware: {
            writeToDisk: true
        },
        port: portToListen,
        hot: false,
        liveReload: false
    },

    plugins: [
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, "../../src/img/logo.png")
        }),
        new MiniCssExtractPlugin({}),
        new ESLintPlugin({
            context: srcJsPath,
            failOnError: false,
            emitWarning: false,
            failOnWarning: false,
            emitError: false
        })
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(js|jsx|mjs)$/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'jsx',
                        target: 'es2015',
                        jsx: 'automatic'
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader',
                    options: {
                        esModule: false,
                        url: true,
                        sourceMap: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: false
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
                        implementation: require('sass')
                    }
                }]
            }
        ]
    }
});
