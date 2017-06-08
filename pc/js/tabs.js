var tab = (function(){
  function _Tab(tabs){
    this.tabBox = tabs;
    this.tabLis = this.tabBox.find('.tab-nav>li');
    this.tabContent = this.tabBox.find('.tab-content>li');
    this.tabBind();
  }
  _Tab.prototype.tabBind = function () {
    var _this = this;
    this.tabLis.on('click', function() {
      var index = $(this).index();
      _this.tabLis.removeClass('active').eq(index).addClass('active');
      _this.tabContent.removeClass('active').eq(index).addClass('active');
    });
  }
  return {
    init: function(ct){
      ct.each(function(index, el) {
        new _Tab($(el));
      });
    }
  }
})();
tab.init($('.tabs'));