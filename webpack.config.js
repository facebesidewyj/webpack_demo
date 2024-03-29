// 设置绝对路径
const website = {
	publicPath: 'http://127.0.0.1:80/'
}
const path = require('path');

// const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

// 同步检查html模板，引入glob
const glob = require('glob');
const purifyCSSPlugin = require('purifycss-webpack');

// 引入人口文件模块
const entry = require('./webpack_config/entry_webpack.js');


module.exports = {
	// 配置source-map
	devtool: 'eval-source-map',

	// 入口文件的配置项
	entry: entry.path,

	// 出口文件的配置项
	output: {
		// 获得项目绝对路径
		path: path.resolve(__dirname, 'dist'),

		/* 打包文件名称，
       [name]的意思是有几个入口文件，
       根据入口文件名打包出几个文件
    */
		filename: '[name].js',
		// 设置绝对路径
		publicPath: website.publicPath
	},

	// 模块，例如压缩图片，解析CSS
	module: {
		rules: [{
			// 正则匹配文件扩展名
			test: /\.css$/,
			// 使用的loader名称
			use: extractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				}, 'postcss-loader']
			})
		}, {
			test: /\.(png|jpg|gif)/,
			use: [{
				loader: 'url-loader',
				// 小于limit设置的字节的文件被打成Base64格式
				options: {
					limit: 5,
					outputPath: 'images/'
				}
			}]
		}, {
			test: /\.(htm|html)$/i,
			use: ['html-withimg-loader']
		}, {
			test: /\.less$/,
			use: extractTextPlugin.extract({
				use: [{
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
				}],
				fallback: 'style-loader'
			})
		}, {
			test: /\.(jsx|js)$/,
			use: {
				loader: 'babel-loader',
			},
			exclude: /node_modules/
		}]
	},

	// 插件，用于生产模块的各项功能
	plugins: [
		// 开发环境不需要压缩js
		// new uglify()
		new htmlPlugin({
			// 对html文件进行压缩
			minify: {
				// 去掉属性的双引号
				removeAttributeQuotes: true
			},
			// 加入hash避免缓存
			hash: true,
			// 入口文件
			template: './src/index.html'
		}),
		new extractTextPlugin('/css/index.css'),
		new purifyCSSPlugin({
			// 寻找html模板,检查哪些css被使用
			paths: glob.sync(path.join(__dirname, 'src/*.html')),
		})
	],

	// 配置webpack开发服务功能
	devServer: {
		// 配置服务器基本运行路径，用于找到程序打包地址
		contentBase: path.resolve(__dirname, 'dist'),
		// 服务运行地址
		host: '127.0.0.1',
		// 开启压缩
		compress: true,
		// 端口
		port: 80
	}
}