/**
 * 简单实现 Promise 语法糖 在语法层面做了一下替换
 */
class Promise {
	constructor(){
		this.callbacks = []; // 存入对象 [{}, {}, {}]
		this.oncatch = null;
	}

	then(onsuccess, onfial){
		this.callbacks.push({
			resolve: onsuccess,
			reject: onfial
		})
		return this;
	}
	// 成功处理
	resolve(result){
		this.complete('resolve', result)
	}

	reject(result){
		this.complete('reject', result)
	}

	complete(type, result){
		if(type === 'reject' && this.oncatch){
			this.callbacks = [];
			this.oncatch(result);
		}else if(this.callbacks[0]){
			let handlerObj = this.callbacks.shift();
			if(handlerObj[type]){
				handlerObj[type](result)
			}
			
		}

	}

	catch(onfail){
		this.oncatch = onfail;
		return this;
	}
}

let p = new Promise();
function fn1(){
	console.log('fn1...');
	setTimeout(function(){
		p.resolve('data1');
	}, 1000)
	return p;
}

function fn2(result){
	console.log('fn2', result);
	setTimeout(function(){
		//p.resolve('data2');	// 执行第一个方法
		p.reject('args'); // 执行第二个方法
	}, 1000)
}

function fn3(result){
	console.log('fn3', result);
	setTimeout(function(){
		p.resolve('data3...');
	}, 1000)
}

function fn4(result){
	console.log('err ...', result);
}

// fn1().then(fn2, fn3).then(fn4);

fn1().then(fn2).then(fn3).catch(fn4);

// 参数 [{resolve: fn1, reject: undefined}, {resolve: fn2, reject: fn3}]