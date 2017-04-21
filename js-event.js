/**
 * 绑定事件对象
 */
function bindEvent(node, type, handler){
	if(!node){ return false; }
	if(node.addEventListener){
		node.addEventListener(type, handler);
		return true;
	}else if(node.attachEvent){
		node['e'+ type + handler] = handler;
		node[type + handler] = function(){
			node['e'+ type + handler](window.event);
		}
		node.attachEvent('on'+type, node[type + handler]);
		return true;
	}
	return false;
}
/**
 * 解绑事件对象
 */
function removeEvent(node, type, handler){
	if(node.removeEventListener){
		node.removeEventListener(type, handler, false);
	}else{
		node.detachEvent('on'+type, node[type + handler]);
		node[type + handler] = null;
	}
}
/**
 * 获取事件的目标元素
 */
function getTarget(e){
	return e.target || e.srcElement;
}
/**
 * 获取事件的目标对象
 */
function getEvent(e){
	return e || window.event;
}
/**
 * 取消事件冒泡
 */
function stopPropagation(e){
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}
/**
 * 取消事件默认行为
 */
function preventDefault(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}
function $(id){
	return document.querySelector(id);
}

function $$(cls){
	return document.querySelectorAll(cls);
}