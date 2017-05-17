// AMD
define(['jquery', 'com/slide', 'com/gotop', 'com/waterfall'], function($,slide,gotop,WaterFall){
	slide.init($('.slide-box'));
	gotop.init($('.goTop'));
	WaterFall.init();
});