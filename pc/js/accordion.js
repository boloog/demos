var accordion = (function(){
    function _Accordion(node){
        this.box = node;
        this.nodeLi = this.box.find('li');
        this.imgWidth = this.nodeLi.find('s').width();
        this.init();
        this.bindEvent();
    }
    _Accordion.prototype.init = function(){
        for (var i = 0; i < this.nodeLi.length; i++) {
            if(i === 0){
                this.nodeLi.eq(0).css('width',this.imgWidth+'px').find('a').addClass('active');
            }
        }
    }
    _Accordion.prototype.bindEvent = function(){
        var _this = this;
        this.nodeLi.on('click', function(){
            var id = $(this).index();
             _this.nodeLi.stop().eq(id).animate({'width':_this.imgWidth+'px'},500).siblings().animate({'width':100+'px'},500);
             _this.nodeLi.find('a').removeClass('active').eq(id).addClass('active');
        });
    }
    return {
        init: function(ct){
            ct.each(function(index, el) {
                new _Accordion($(el));
            });
        }
    }
})();
accordion.init($('.accordion'));