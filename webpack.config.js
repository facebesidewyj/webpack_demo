const path = require('path');
// const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
	// 入口文件的配置项
	entry: {
		entry: './src/js/entry.js',
		second: './src/js/second.js'
	},

	// 出口文件的配置项
	output: {
		// 获得项目绝对路径
		path: path.resolve(__dirname, 'dist'),

		/* 打包文件名称，
       [name]的意思是有几个入口文件，
       根据入口文件名打包出几个文件
    */
		filename: '[name].js'
	},

	// 模块，例如压缩图片，解析CSS
	module: {
		rules: [{
			// 正则匹配文件扩展名
			test: /\.css$/,
			// 使用的loader名称
			use: ['style-loader', 'css-loader']
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