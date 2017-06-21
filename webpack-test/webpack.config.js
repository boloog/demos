module.exports = {
	entry: './entry.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
		      	test: /\.js$/,
		      	exclude: /(node_modules)/, // 排除
		      	use: {
		        	loader: 'babel-loader',
		      	}
		  	},
			{
				test: /\.css$/,
				use: [
		        	{ loader: "style-loader" },
		        	{ loader: "css-loader" }
		        ]
			}
		]
	}
}