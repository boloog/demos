let fs = require('fs');
let Promise = require('../promise').Promise;

let p = new Promise();

var str = '';
// 异步处理 读取文件
readFile('a.txt').then(function(line){
	str += line;
	readFile('b.txt')
}).then(function(line){
	str += line;
	readFile('c.txt')
}).then(function(line){
	str += line;
	p.resolve(str)
}).then(function(result){
	console.log(result)
}).catch(function(){
	console.log('error')
})

function readFile(path){
	fs.readFile(path, 'utf-8', function(err, str){
		if(err){
			p.reject(path);
		}else{
			p.resolve(str);
		}
	})
	return p;
}