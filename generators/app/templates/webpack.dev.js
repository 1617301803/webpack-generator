const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            { // 开发模式不抽离css
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            { // 开发模式不抽离css
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});