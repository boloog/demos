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
	// 监听错误
	catch(onfail){
		this.oncatch = onfail;
		return this;
	}
}

module.exports.Promise = Promise;
