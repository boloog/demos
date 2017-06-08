var WeaponList =(function(){
	function _WeaponList(){
		this.page = 1;
		this.nums = 23;
		this.star = 0;
		this.wuqiId = $('#wuqi-list');
		this.showBox = $('#wuqi-show');
		this.GameRole(this.page, this.nums, this.star);
        this.heroSearch();
        this.liAddEvent();
        this.prevPage();
        this.nextPage();
		this.heroStars();
	}
	// 加载列表
	 _WeaponList.prototype.GameRole = function(p,n,l){
		var data = {page:p,nums:n,level:l},_this = this;
		_this.wuqiId.hide();
		_this.wuqiId.find('ul').empty();
		_this.showBox.empty();
		$.get("http://qysg.vxinyou.com/game_arms/list.php", data,function (response) {
			if(response.success){
				var role_list = '';
				for(var item in response.data){
					role_list += '<li class="spbg gameinfo-bg"><i class="spbg gameinfo-active" data-gameid="'+item+'"></i><img src="http://images.vxinyou.com/qysg/pc/images/weapon/'+item+'.png" style="width:100px;height:100px"><p>'+ response.data[item].title+'</p></li>';
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
						if( data.page !== 2){
							page_btn ='<li class="spbg gameinfo-bg1"><span>下一页</span></li>';
						}else{
							page_btn = '<li class="spbg gameinfo-bg3"><span>上一页</span></li><li class="spbg gameinfo-bg1"><span>下一页</span></li>';
						}
					}
				}
				role_list += page_btn;

				_this.wuqiId.find('ul').removeClass('no-hero-list').append( role_list )
				_this.wuqiId.fadeIn();
			}else{
				$('#wuqi-list ul').addClass('no-hero-list').text("没有记录");
				_this.wuqiId.fadeIn();
			}
		},"json");
	 }
	 // 上一页
	 _WeaponList.prototype.prevPage = function(){
		 var _this = this;
		this.wuqiId.on('click', '.gameinfo-bg1', function(){
			_this.page++;
			_this.GameRole(_this.page, _this.nums, _this.star, _this.color);
		});
	 }
	 // 下一页
	 _WeaponList.prototype.nextPage = function(){
		var _this = this;
		this.wuqiId.on('click', '.gameinfo-bg3', function(){
			_this.page--;
			_this.GameRole(_this.page, _this.nums, _this.star, _this.color);
		});
	}
	// 稀有度
	 _WeaponList.prototype.heroStars = function(){
		var _this = this;
		 $('.nav-list-03').on('click','dt,dd', function(){
			 _this.star = $(this).data('level');
			 $(this).addClass('hover').siblings().removeClass('hover');
			 _this.page = 1;
			 _this.GameRole(_this.page, _this.nums, _this.star);
		 })
	 }
	// 事件
	 _WeaponList.prototype.liAddEvent = function(){
		var _this = this;
		this.wuqiId.on('click', '.gameinfo-bg', function(){
			var dataId  = $(this).find('i').data('gameid');
			 _this.getRoleInfo(dataId);
		});
	 }
	 // 搜索
	 _WeaponList.prototype.heroSearch = function(){
		 var ipt = $("#searBingqi");
		 ipt.focus(function(){
			 var thisVal = $(ipt);
			 if(thisVal.val() == "请输入兵器名称"){
				 thisVal.val("")
			 }else{
				 thisVal.val();
			 }
		 });
		 ipt.blur(function(){
			 var thisVal = $(ipt);
			 if(thisVal.val() == ""){
				 thisVal.val("请输入兵器名称")
			 }else{
				 thisVal.val();
			 }
		 });
		var _this = this;
		 $('.search-btn').on('click', function(){
			 var searchKey = ipt.val(),dataId;
			$.get("http://qysg.vxinyou.com/game_arms/so.php",{key:searchKey},function (response) {
					if(response.success){
						for(var item in response.data){
							dataId = item;
						}
						_this.getRoleInfo(dataId);
					}else{
						alert("请正确输入兵器名称！");
					}
			},"json");
		 });
	 }
	 _WeaponList.prototype.getRoleInfo = function(dataid){
		 var _this = this;
		this.showBox.empty();
		$.get("http://qysg.vxinyou.com/game_arms/info.php", {id:dataid},function (response) {
			var weaponContent = '<a href="javascript:;" class="spbg back-btn back-wuqi">&lt; 返回武器库</a><div class="gameinfo-show"><div class="show-top clearfix"><h3>'+response.data.title+'</h3><p class="bq-tit">- '+response.data.level+' -</p><div class="bq-ms">   <s class="spbg top-jiao top-jiao1"></s>'+response.data.desc+'<s class="spbg top-jiao top-jiao2"></s></div><div class="initial-attribute"><p class="tit-img-name"><s class="spbg hero-left-ico ico-cs"></s> 初始属性</p>';
			var weaponInitial = '';
			for(var item in response.data.attribute){
				par = Math.floor(response.data.attribute[item].nums / response.data.attribute[item].max * 100);
				weaponInitial += '<p class="progress-bar"><span>'+response.data.attribute[item].data+'</span><em class="color-'+item+'" style="width:'+par+'%"></em></p>'
			}
			weaponInitial +='</div><div class="role-img"><img src="http://images.vxinyou.com/qysg/pc/images/weapon/'+response.data.id+'.png" alt=""></div><div class="initial-attribute"><p class="tit-img-name"><s class="spbg hero-left-ico ico-rising"></s> 升星解锁属性</p></p><p class="rising-ms"><s class="spbg sp-rising"></s>专属属性（2星解锁）'+response.data.start2+'</p><p class="rising-ms"><s class="spbg sp-rising"></s>被动属性（4星解锁）'+response.data.start3+'</p><p class="rising-ms"><s class="spbg sp-rising"></s>被动属性（5星解锁）'+response.data.start4+'</p><p class="rising-ms"><s class="spbg sp-rising"></s>额外属性'+response.data.attach+'</p></div><div class="generals"><p class="tit-img-name"><s class="spbg hero-left-ico ico-generals"></s>专属武将</p></p>';

			var generals = '<ul class="clearfix">';
			if(response.data.hero){
				for(var item in response.data.hero){
					generals += '<li class="wujiang-id" data-gameid="'+response.data.hero[item].id+'"><img src="http://images.vxinyou.com/qysg/pc/images/hero/card_'+response.data.hero[item].id+'.jpg" style="width:80px;"><p class="generals-name">'+response.data.hero[item].name+'</p></li>'
				}
			}else{
				generals += '<li>无</li>';
			}
			generals += '</ul></div></div><div class="role-ft"></div></div>';
			_this.showBox.html(weaponContent+weaponInitial+generals);
			_this.wuqiId.hide(); _this.showBox.fadeIn();
		},"json");

		this.showBox.on('click', '.back-wuqi', function(){
			_this.wuqiId.fadeIn();
			_this.showBox.empty();
		});
		this.showBox.on('click', '.wujiang-id', function(){
			var id = $(this).data('gameid');
			_this.getInfo(id,dataid);
		});
	}
	 _WeaponList.prototype.getInfo = function(dataid,bqid){
		var _this = this;
		this.showBox.empty();
		$.get("http://qysg.vxinyou.com/game_role/info.php", {id:dataid},function (response) {
			var heroShoe = '<a href="javascript:;" class="spbg back-btn back-wuqi">&lt; 返回武器库</a><div class="gameinfo-show"><div class="show-top clearfix"><h3>'+response.data.name+' - '+response.data.color+'</h3><div class="spbg wj-star wj-star'+response.data.star+'"></div><div class="bq-ms" style="padding-left: 0;">'+response.data.content+'</div>';
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
			_this.showBox.html(heroShoe+heroInitial);
			_this.wuqiId.hide();
			 _this.showBox.fadeIn();
		},"json");

		this.showBox.on('click', '.back-wuqi', function(){
			_this.wuqiId.fadeIn();
			_this.showBox.empty();
			21059
		});
	}
	return {
		init: function(){
			new _WeaponList();
		}
	}
})();
WeaponList.init();