# JavaScript事件兼容的函数

代码说明

|事件说明|IE8以下浏览器|新版本IE和非IE浏览器|
|:---------:|--|--|
|事件绑定|node.attrachEvent('onclick',fn)|node.addEventListener('click',fn,false)|
|解除事件绑定|node.detachEvent('onclick',fn)|node.removeEventListener('click',fn,false)|
|阻止事件冒泡|e.cancelBubble=true|e.stopPropagation()|
|取消事件默认行为|e.returnValue=false|e.preventDefault()|
|点击对象|e.srcElement|e.target|
|this指向？|window|node|

[事件封装](https://github.com/boloog/demos/blob/master/js-event.js)