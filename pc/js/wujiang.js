var RoleList =(function(){
	function _RoleList(dataid){
		this.page = 1;
		this.nums = 23;
		this.star = 0;
		this.color = 0;
		this.wujiangId = $('#wujiang-list');
		this.showBox = $('#wujiang-show');
		this.dataid = dataid;
		this.GameRole(this.page, this.nums, this.star, this.color);

        this.heroSearch();
        this.liAddEvent();
        this.prevPage();
        this.nextPage();
		this.heroStars();
		this.heroQuality();
		
	}
	// 加载列表
	 _RoleList.prototype.GameRole = function(p,n,s,c){
		var data = {page:p,nums:n,star:s,color:c},_this = this;
		this.showBox.empty();
		_this.wujiangId.hide();
		 _this.wujiangId.find('ul').empty();
		$.get("http://qysg.vxinyou.com/game_role/list.php", data,function (response) {
			if(response.success){
				var role_list = '';
				for(var item in response.data){
					role_list += '<li class="spbg gameinfo-bg2"><i class="spbg gameinfo-active" data-gameid="'+item+'"></i><img src="http://images.vxinyou.com/qysg/pc/images/hero/card_'+item+'.jpg"><p>'+ response.data[item].name+'</p></li>';
					page_n = item;
				}
				var page_btn = '';

				if(_this.page < parseInt(response.all / page_n) && _this.page < _this.nums){
					page_btn ='<li class="spbg gameinfo-bg1"><span>下一页</span></li>';
				}else{
					if((_this.page * _this.nums) > response.all){
						if(response.all < 23){
							page_btn ="";
						}
						else{
							page_btn ='<li class="spbg gameinfo-bg3"><span>上一页</span></li>';	
						}
					}else{
						if( data.color === 2){
							page_btn ='<li class="spbg gameinfo-bg1"><span>下一页</span></li>';
						}else if( data.color === 3){
							page_btn ='<li class="spbg gameinfo-bg1"><span>下一页</span></li>';
						}else{
							page_btn = '<li class="spbg gameinfo-bg3"><span>上一页</span></li><li class="spbg gameinfo-bg1"><span>下一页</span></li>';
						}
					}
				}
				role_list += page_btn;
				_this.wujiangId.find('ul').removeClass('no-hero-list').append( role_list )
				if(_this.dataid > 0){ 
					_this.wujiangId.hide();
					_this.getRoleInfo(_this.dataid);
					_this.dataid = 0;
				}else{
					_this.wujiangId.fadeIn();
				}

				
			}else{
				_this.wujiangId.find('ul').addClass('no-hero-list').text("没有记录");
				_this.wujiangId.fadeIn();
			}
		},"json");
	 }
	 // 上一页
	 _RoleList.prototype.prevPage = function(){
		 var _this = this;
		this.wujiangId.on('click', '.gameinfo-bg1', function(){
			_this.page++;
			_this.GameRole(_this.page, _this.nums, _this.star, _this.color);
		});
	 }
	 // 下一页
	 _RoleList.prototype.nextPage = function(){
		var _this = this;
		this.wujiangId.on('click', '.gameinfo-bg3', function(){
			_this.page--;
			_this.GameRole(_this.page, _this.nums, _this.star, _this.color);
		});
	}
	// 星级
	 _RoleList.prototype.heroStars = function(){
		var _this = this;
		 $('.nav-list-01').on('click','dt,dd', function(){
			 _this.star = $(this).data('quality');
			 $(this).addClass('hover').siblings().removeClass('hover');
			 _this.page = 1;
			 _this.GameRole(_this.page, _this.nums, _this.star, _this.color);
		 })
	 }
	 // 品质
	 _RoleList.prototype.heroQuality = function(){
		var _this = this;
		 $('.nav-list-02').on('click','dt,dd', function(){
			 _this.color = $(this).data('cost');
			 _this.page = 1;
			 $(this).addClass('hover').siblings().removeClass('hover');
			 _this.GameRole(_this.page, _this.nums, _this.star, _this.color);
		 })
	 }
	// 事件
	 _RoleList.prototype.liAddEvent = function(){
		var _this = this;
		this.wujiangId.on('click', '.gameinfo-bg2', function(){
			var dataId  = $(this).find('i').data('gameid');
			 _this.getRoleInfo(dataId);
		});
	 }
	 // 搜索
	 _RoleList.prototype.heroSearch = function(){
		 var ipt = $("#searWujiang");
		 ipt.focus(function(){
			 var thisVal = $(ipt);
			 if(thisVal.val() == "请输入武将名称"){
				 thisVal.val("");
			 }else{
				 thisVal.val();
			 }
		 });
		 ipt.blur(function(){
			 var thisVal = $(ipt);
			 if(thisVal.val() == ""){
				 thisVal.val("请输入武将名称");
			 }else{
				 thisVal.val();
			 }
		 });
		var _this = this;
		 $('.search-btn').on('click', function(){
			 var searchKey = ipt.val(),dataId;
			$.get("http://qysg.vxinyou.com/game_role/so.php",{key:searchKey},function (response) {
					if(response.success){
						for(var item in response.data){
							dataId = item;
						}
						_this.getRoleInfo(dataId);
					}else{
						alert("请正确输入武将名称！");
					}
			},"json");
		 });
	 }
	 _RoleList.prototype.getRoleInfo = function(dataid){
		var _this = this;
		this.wujiangId.hide();
		this.showBox.empty();
		
		$.get("http://qysg.vxinyou.com/game_role/info.php", {id:dataid},function (response) {
			var heroShoe = '<a href="javascript:;" class="spbg back-btn back-wujiang">&lt; 返回武将库</a><div class="gameinfo-show"><div class="show-top clearfix"><h3>'+response.data.name+' - '+response.data.color+'</h3><div class="spbg wj-star wj-star'+response.data.star+'"></div><div class="bq-ms" style="padding-left: 0;">'+response.data.content+'</div>';
			var heroInitial = '<div class="initial-attribute"><p class="tit-img-name"><s class="spbg hero-left-ico ico-cs"></s> 初始属性</p>';
			for(var item in response.data.param){
				if(item < 1){
					par = Math.floor(response.data.param[item].nums / 1400 *100);
					heroInitial += '<p class="progress-bar"><span>'+response.data.param[item].text+'</span><em class="color-'+item+'" style="width:'+par+'%"></em></p>';
				}else{
					par =Math.floor(response.data.param[item].nums / 630*100);
					heroInitial += '<p class="progress-bar"><span>'+response.data.param[item].text+'</span><em class="color-'+item+'" style="width:'+par+'%;"></em></p>';
				}
			}
			heroInitial +='</div><div class="hero-b-img"><img src="http://images.vxinyou.com/qysg/pc/images/hero/big_'+response.data.id+'.jpg" alt=""></div><div class="generals-box"><p class="tit-img-name"><s class="spbg hero-left-ico ico-rising"></s> 定位</p><p class="rising-ms">'+response.data.position+'</p></div><div class="generals-box"><p class="tit-img-name"><s class="spbg hero-left-ico ico-rising"></s> 技能</p><p class="rising-ms">'+response.data.skill+'</p></div></div><div class="role-ft"></div></div>';
			_this.showBox.html(heroShoe+heroInitial);_this.wujiangId.hide(); _this.showBox.fadeIn();
		},"json");

		this.showBox.on('click', '.back-wujiang', function(){
			_this.wujiangId.fadeIn();
			_this.showBox.hide();
		});
	}
	return {
		init: function(dataid){
			new _RoleList(dataid);
		}
	}
})();
RoleList.init(dataid);