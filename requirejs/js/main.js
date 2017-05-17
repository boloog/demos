// require.js配置加载模块地址
requirejs.config({
	baseUrl: ".",
	paths: {
		'jquery': './lib/jquery.min'
	}
});

// 加载入口模块
requirejs(['app/index']);