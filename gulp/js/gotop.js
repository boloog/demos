var gotop = (function(){
    function GoTop(ct){
        this.target = ct;
        this.bindEvent();
    }
    /**
     * 绑定事件
     */
    GoTop.prototype.bindEvent = function(){
        var _this = this;
        $(window).on('scroll', function(){
            if($(window).scrollTop() > 200){
                _this.target.show();
            }else{
                _this.target.hide();
            }
        });
        this.target.on('click', function(){
            $(window).scrollTop(0);
        });
    };
    /**
     * 创建返回按钮
     */
    GoTop.prototype.createNode = function(){
        $('body').append(this.target);
    };
    return {
        init: function(ct){
            new GoTop(ct);
        }
    };
})();
gotop.init($('.goTop'));

