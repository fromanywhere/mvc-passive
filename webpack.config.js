/*global require, module,__dirname*/
const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './App.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    resolve: {
        modules: [
            path.resolve('./')
        ]
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: "dot-loader"
            }]
        }]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
};