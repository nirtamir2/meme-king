const path = require('path');


module.exports = {
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
                test: /\.scss$/,
                loader: 'style-loader'
            },
            {
                test: /\.scss$/,
                loader: 'css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader'
            }

        ]
    },
    devServer: {
        port: 3000, // most common port
        contentBase: './build',
        inline: true,


    }
}