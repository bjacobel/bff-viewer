import config from './src/constants/config';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DefinePlugin = webpack.DefinePlugin;

const wpconfig = {
  entry: {
    main: [
      './src/index.js',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  debug: true,
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
    ],
  },
  sassLoaderConfig: {
    sourceComments: true,
    outputStyle: 'expanded',
    sourceMap: false,
  },
  resolve: {
    extensions: ['', '.js', 'json', '.scss'],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
};

if (config.HotReload) {
  wpconfig.entry.main = ['webpack/hot/dev-server', ...wpconfig.entry.main];
}

module.exports = wpconfig;
