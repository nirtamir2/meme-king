const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports =  function({ env }) {

    const isProduction = (env === 'production');

    return  {
        entry: ['babel-polyfill', './app/index.js'],
        resolve: {
            modules: [
                path.resolve('./app'),
                'node_modules'
            ]
        },
        output: {
            path: __dirname + '/build',
            filename: 'bundle.js',

        },
        module: {
            loaders: [

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },

                {
                    test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.scss/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: "style-loader",
                        loader: "css-loader!sass-loader",
                    }),
                }

            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(env),
            }),
            isProduction ? new UglifyJSPlugin() : _.noop,
            new ExtractTextPlugin('style.css')

        ],
        devServer: {
            port: 3000, // most common port
            contentBase: './build',
            inline: true,
            historyApiFallback: true


        }
    }

}

