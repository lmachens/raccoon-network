const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ outputPath, mode }) => ({
  name: 'server',
  mode,
  target: 'web',
  entry: {
    main: 'startup/main.ts',
    overlay: 'startup/overlay.ts'
  },
  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
  output: {
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        loader: require.resolve('babel-loader'),
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src')],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      title: 'Raccoon Network - Main',
      excludeChunks: ['overlay'],
      template: path.resolve(__dirname, './template.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'overlay.html',
      title: 'Raccoon Network - Overlay',
      excludeChunks: ['main'],
      template: path.resolve(__dirname, './template.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
});
