var $ = require('jquery');
var gotop = require('./js/com/gotop');
var slide = require('./js/com/slide');
var waterfall = require('./js/com/waterfall');
slide.init($('.slide-box'));
gotop.init($('.goTop'));
waterfall.init();


