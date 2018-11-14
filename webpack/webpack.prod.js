const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin');

const config = {
	devtool: 'inline-source-map',
	entry: {
		main: ['./src/main.ts'],
		vendor: ['./src/vendor.ts']
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
				test: /.ts$/,
				use: [
					{ loader: 'ts-loader', options: { transpileOnly: true } }
				]
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'file-loader', options: { name: '[name].css' } },
					{ loader: 'extract-loader' },
					{ loader: 'css-loader', options: { minimize: true } },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.html$/,
				use: [
					{ loader: 'file-loader', options: { name: '[name].html' } },
					{ loader: 'extract-loader' },
					{ loader: 'html-loader', options: { attrs: [ 'img:src' ] } }
				]
			},
			{
				test: /\.(jpg|gif|png)$/,
				use: [
					{ loader: 'file-loader', options: { name: 'assets/images/[name]-[hash:8].[ext]' } }
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
		new ForkTsCheckerWebpackPlugin({ tslint: true }),
		new UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			minChunks: Infinity
		})
	],
	devServer: {
		contentBase: 'dist',
		overlay: true
	}
};

module.exports = config;
