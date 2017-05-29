var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
      entry: [
        APP_DIR + '/index.jsx'
      ],
      output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
     },
     module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: ['react-hot-loader', 'babel-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
     }
};

module.exports = config;
