var marked = require('marked');

var str = marked('# hello bolong');


console.log( str );

module.exports = str;

// 
// dependencies  --save 下载的信息放到这里 用于自己发布 和 同事使用 packpage.json npm install 就可以使用模块了 
//  例，我提交到github上面，上传到github的时候不上传 node_modules
// 
// devDependencies --save-dev  这是测试工具 跟上面的区别在于别人使用我的 packpage.json npm install  就不会安装这里面的 模块 。
//  
// 
// 
// packpage.json 大家一起用
// 在npm install  就会下载 dependencies 


// 上传 
// npm login
// name
// pwd 
// npm publish 
// 
// 
// bin  // 命令 可以执行里面的值 
// #!usr/bin/env node 
// requrst  npm  和 axios  是一样的
// var axios = require('axios');
// 
// process.argv  得到用户输出 的数据
// var data = {}
// if(process.argv[2]){
// 	
// }
// scripts : test  执行 (这里自己封装一些命令 比如压缩css js 等)
// npm test  多个的话就用 
// npm run build 
// 
// css 压缩  gulp-cssnano
// css 合并  gulp-concat


