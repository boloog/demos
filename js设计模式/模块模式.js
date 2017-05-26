/**
 * 模块模式 = 封装大部分代码，只暴露必需接口
 */
var Car = (function(){
    var name = '法拉利';
    function sayName(){
        console.log( name );
    }
    function getColor(name){
        console.log( name );
    }
    return {
        name: sayName,
        color: getColor
    }
})();
Car.name();
Car.color('红色');
