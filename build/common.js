const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const manifest = require('./manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = ({ outputPath, mode, ...other }) => ({
  name: 'server',
  mode,
  target: 'web',
  entry: {
    main: 'startup/main.tsx',
    overlay: 'startup/overlay.tsx',
    web: 'startup/web.tsx'
  },
  devtool: mode === 'production' ? '' : 'source-map',
  output: {
    path: path.resolve(__dirname, '..', outputPath)
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        loader: require.resolve('babel-loader'),
        include: [path.resolve(__dirname, '../src')]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src')],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin([outputPath], { root: path.resolve(__dirname, '..') }),
    new GenerateJsonPlugin(
      'manifest.json',
      manifest,
      (key, value) => {
        if (mode === 'development' && key === 'meta') {
          return {
            ...value,
            name: value.name + ' - DEV'
          };
        }
        return value;
      },
      2
    ),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../assets'), to: 'assets' }]),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../plugins'), to: 'plugins' }]),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      title: 'Raccoon Network - Main',
      excludeChunks: ['overlay', 'web'],
      template: path.resolve(__dirname, './template.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'overlay.html',
      title: 'Raccoon Network - Overlay',
      excludeChunks: ['main', 'web'],
      template: path.resolve(__dirname, './template.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'web.html',
      title: 'Raccoon Network',
      excludeChunks: ['main', 'overlay'],
      template: path.resolve(__dirname, './template.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  ...other
});
