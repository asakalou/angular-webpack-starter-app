/**
 * Created by asakalou on 2/15/16.
 */

var libs = require('./webpack.project.libs.js');

var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = function (opts) {
    var _outputDir = opts.outputDir || (__dirname + '/dist');
    var _jsFileNameTemplate = opts.hash ? '[name].[chunkhash:8].js' : '[name].js';
    var _cssFileNameTemplate = opts.hash ? '[name].[contenthash:8].css' : '[name].css';

    var plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin(libs.provide),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', filename: _jsFileNameTemplate
        }),

        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),

        new ExtractTextPlugin(_cssFileNameTemplate)
    ];

    if (opts.min) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        }))
    }
    if (opts.clean) {
        plugins.push(new CleanWebpackPlugin([_outputDir], {
            root: process.cwd(),
            verbose: true, dry: false
        }))
    }
    if (opts.hash) {
        plugins.push(new WebpackMd5Hash());
    }

    return {
        entry: {
            app: ['./app/app.js'],
            vendor: libs.vendor
        },

        output: {
            path: _outputDir,
            publicPath: '/',
            filename: _jsFileNameTemplate
        },

        module: {
            loaders: [
                {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css")},
                {test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less")},
                {test: /\.html$/, loader: 'html'},
                {test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url?limit=100000'},
                {
                    test: /\.js$/, exclude: /node_modules/, loader: 'babel',
                    query: {
                        cacheDirectory: true,
                        plugins: ['transform-runtime']
                    }
                }
            ]
        },

        plugins: plugins,

        devtool: "#source-map",

        devServer: {
            hot: true,
            historyApiFallback: true
        }
    };
};
