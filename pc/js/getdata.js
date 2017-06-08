var getData = (function(){
    function _getData(){
        this.level = 5;
        this.color =4;
        this.gameArms(this.level);
        this.gameRole(this.color);
        this.bindEvent();
        this.navGame();
    }
    _getData.prototype.navGame = function(){
        $('.nav>li').mouseenter(function () {
            $(this).find('.wujiang-sel').stop().show(); 
        }).mouseleave(function () {
            $(this).find('.wujiang-sel').stop().hide(); 
        });
    }
    _getData.prototype.bindEvent = function () {
        var _this = this;
        $('.weapon-tabs-content').on('click', '.tabShow li', function(){
            var id = $(this).index(),
                weapon = $(this).data('weapon'),
                itemImg = $(this).parent('ul').siblings('div').find('img');
            if(weapon){
                itemImg.attr('src','http://images.vxinyou.com/qysg/pc/images/weapon/'+weapon+'.png');
                $(this).find('a').addClass('active').parent('li').siblings().find('a').removeClass('active');
            }
        })
    }
     _getData.prototype.gameArms = function (level) {
         var _this = this;
         $.get("http://qysg.vxinyou.com/game_arms/list.php", {page:1,nums:10,level:level},function (response) {
            if(response.success){
                var html = '<ul class="tabShow item-ul clearfix">';
                var lslength = 0,firstId = '';
                if(level >= 0){
                    for(var item in response.data){
                        if(firstId == ''){
                            firstId = item;
                            html += '<li data-weapon="'+item+'"><a href="javascript:;" class="active">'+ response.data[item].title+'</a></li>';
                        }else{
                            if(lslength < 9){
                                html += '<li data-weapon="'+item+'"><a href="javascript:;">'+ response.data[item].title+'</a></li>';
                            }
                        }
                        
                        lslength++;
                    }
                    html +='<li><a href="https://boloog.github.io/demos/pc/bingqi.html" target="_black">更多武器</a></li></ul><div class="item-img-cont"><img src="http://images.vxinyou.com/qysg/pc/images/weapon/'+firstId+'.png" alt=""></div>';
                    $('.weapon-tabs-content li').eq(level).append(html);
                    level--;firstId = '';_this.gameArms(level);
                }
            }
        },"json");
     }
     _getData.prototype.gameRole = function (color) {
        var _this = this;
        $.get("http://qysg.vxinyou.com/game_role/list.php", {page:1,nums:9,star:0,color:color},function (response) {
            if(response.success){
            var html = '<ul class="item-ul clearfix">';
            var lslength = 0;
                if(color >= 0){
                    for(var item in response.data){
                        if(lslength < 9){
                            html +='<li><a target="_black" href="https://boloog.github.io/demos/pc/wujiang.php?heroid='+item+'"><img src="http://images.vxinyou.com/qysg/pc/images/hero/card_'+item+'.jpg"><img src="./images/data-card.png" class="data-card">'+ response.data[item].name+'</a></li>';
                        }
                        lslength++;
                    }
                    html +='<li><a href="https://boloog.github.io/demos/pc/wujiang.php"><span>更多武将</span></a></li></ul>';
                    $('.data-tabs-content li').eq(color).append(html);
                    color--;_this.gameRole(color);
                }
            }
        },"json");
     }
    return {
        init: function(ct){
            new _getData();
        }
    }
})();
getData.init();