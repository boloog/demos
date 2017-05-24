var WaterFall = {
	init: function(){
		// 添加 item 盒子
		this.addItem(5);
		// 添加好盒子就开始布局
		this.layout();
		// 改变窗口时执行
		this.resize();
		// 添加事件
		this.addEvent();
	},
	addItem: function(number){
		this.number = number;
		var wrap = $('.wrap');
		// 生成多个div 随机高度 和 颜色
		var item = '';
		for (var i = 0; i < this.number; i++) {
			item +='<div class="item" style="height:'+parseInt(Math.random() * 100 + 230)+'px;background-color:'+this.getRandColor()+'">'+i+'</div>';
		}
		wrap.append(item);
		
	},
	layout: function(){
		var elHeight = [];
		// 计算每一行可以存放几个 item 总宽 / item宽度
		var countWidth =  Math.floor( $('.wrap').width() / $('.item').width()); 
		// 初始化添加 第一行高度的下标  
		for (var i = 0; i < countWidth; i++) {
			elHeight[i] = 0;
		}
		// 循环 所有item  
		$('.item').each(function(index, el) {
			// apply 传入数组 取得最小的高度
			var minValue = Math.min.apply(null, elHeight);
			// console.log(minValue)
			// 然后获取当前高度的索引
			var minIndex = elHeight.indexOf(minValue);
			// 修改当前的top 和 left 
			$(this).css({
				top: elHeight[minIndex],	// 获取当前索引对应的高度
				left: $(this).outerWidth(true) * minIndex	// 当前的left值为 索引 * 宽度（位于第几个）
			});
			// 当前索引的高度 += 当前 item 的高度 （比如计算第二排高度时， 就等于上一个的 top + 当前的高度）elHeight[0] += 90  下一次高度就为90 
			elHeight[minIndex] += $(this).outerHeight(true);
			$('.wrap').css('height', elHeight[minIndex]);
		});
	},
	resize: function(){
		$(window).resize(function() {
			WaterFall.layout();
		});
	},
	addEvent: function(){
		var _this = this;
		$('.more').on('click', function(){
			_this.addItem(5);
			// 添加好盒子就开始布局
			_this.layout();
		});
	},
	getRandColor: function(){
		var str = '1234567890abcdef';
		var colorStr = '#';
		for(var i =0; i < 6; i++){
			colorStr += str[ Math.floor(Math.random() * str.length) ];
		}
		return colorStr;
	}
};
WaterFall.init();
