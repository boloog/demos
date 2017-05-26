// 混合模式 = 原型模式 + 构造函数模式
function Animal(name, color){
    this.name = name;
    this.color = color;

    console.log( this.name  +  this.color)
}
Animal.prototype.getInfo = function(){
    console.log('名称：'+ this.name);
}

function largeCat(name, color){
    Animal.call(null, name, color);

    this.color = color;
}

largeCat.prototype = create(Animal.prototype);
function create (parentObj){
    function F(){}
    F.prototype = parentObj;
    return new F();
};

largeCat.prototype.getColor = function(){
    return this.color;
}
var cat = new largeCat("Persian", "白色");

console.log( cat )

