const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WriteFilePlugin = require('write-file-webpack-plugin');

const config = {
	devtool: 'inline-source-map',
	entry: {
		main: ['./src/main.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '..', 'dist')
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		modules: [path.resolve('node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.(scss)$/,
				use: [
					{ loader: 'file-loader', options: { name: '[name].css' } },
					{ loader: 'extract-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.html$/,
				use: [
					{ loader: 'file-loader', options: { name: '[name].html' } },
					{ loader: 'extract-loader' },
					{ loader: 'html-loader', options: { attrs: [ 'section:data-background-image', 'img:src' ] } }
				]
			},
			{
				test: /\.(jpg|gif|png)$/,
				use: [
					{ loader: 'file-loader', options: { name: 'assets/images/[name].[ext]' } }
				]
			},
      {
        test: /\.(ttf|woff|woff2)$/,
        use: [
					{ loader: 'file-loader', options: { name: 'assets/fonts/[name].[ext]' } }
				]
      }
		]
	},
	plugins: [
		new WriteFilePlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '..', 'node_modules', 'reveal.js', 'plugin'),
				to: path.resolve(__dirname, '..', 'dist', 'plugin')
			},
			{
				from: path.resolve(__dirname, '..', 'node_modules', 'reveal.js', 'lib', 'js', 'head.min.js'),
				to: path.resolve(__dirname, '..', 'dist', 'lib', 'js', 'head.min.js')
			},
			{
				from: path.resolve(__dirname, '..', 'node_modules', 'reveal.js', 'js', 'reveal.js'),
				to: path.resolve(__dirname, '..', 'dist', 'js', 'reveal.js')
			}
		])
	],
	devServer: {
		contentBase: 'dist',
		overlay: true
	}
};

module.exports = config;
