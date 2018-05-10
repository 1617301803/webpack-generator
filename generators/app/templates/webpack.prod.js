const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }),
        // 用这么性能反而会不好 为啥？
        // new ParallelUglifyPlugin({
        //     uglifyJS: {
        //         output: {
        //             // 最紧凑的输出
        //             beautify: false,
        //             // 删除所有注释
        //             comments: false
        //         },
        //         compress: {
        //             warnings: false,
        //             // 删除所有console
        //             drop_console: true,
        //             // 内嵌已定义但是只有到一次的变量
        //             collapse_vars: true,
        //             // 提取变量
        //             reduce_vars: true
        //         }
        //     },
        //     //cacheDir: './cache'
        // })
    ],
});