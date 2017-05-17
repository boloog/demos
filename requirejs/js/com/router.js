/**
 * 当 http://localhost:8080/loadMore 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象 
 * 通过req.send发送响应
 */
app.get('/loadMore', function(req, res) {
  var pageIndex = req.query.pageIndex; // 通过 req.query获取请求参数
  var length = req.query.length; // 通过 req.query获取请求参数
  var data = [];

  for (var i = 0; i < length; i++) {
    data.push('新闻' + (parseInt(pageIndex) + i ));
  }
  res.send(data);

});