/**
 * 当 http://localhost:8080/loadMore 的GET请求到来时被下面匹配到进行处理
 * 通过req.query获取请求的参数对象 
 * 通过req.send发送响应
 */

app.get('/getMoreNews', function (req, res) {

  var news = [
  {
    name: "ajax基础实践",
    url: "http://www.jianshu.com/p/d25c1e8dca54"
  },
  {
    name: "JavaScript的BOM基础",
    url: "http://www.jianshu.com/p/29b861b94e3a"
  },
  {
    name: "JavaScript的定时器",
    url: "http://www.jianshu.com/p/0999e6eb8b7b"
  },
  {
    name: "JavaScript的闭包",
    url: "http://www.jianshu.com/p/54a5042817e9"
  },
  {
    name: "JavaScript的DOM事件操作",
    url: "http://www.jianshu.com/p/4e55029342fb"
  },
  {
    name: "JavaScript正则表达式基本语法和用法",
    url: "http://www.jianshu.com/p/53135582b2a2"
  },
  {
    name: "JavaScript操作Date对象处理日期和时间",
    url: "http://www.jianshu.com/p/feaea240b079"
  },
  {
    name: "JavaScript的Math对象和数组操作",
    url: "http://www.jianshu.com/p/7772c69f5283"
  },
  {
    name: "JavaScript字符串和JSON",
    url: "http://www.jianshu.com/p/b0ec911daea7"
  },
  {
    name: "JavaScript引用类型与对象拷贝",
    url: "http://www.jianshu.com/p/9adfe1195366"
  },
  {
    name: "JavaScript的数据类型和基础运算符的使用",
    url: "http://www.jianshu.com/p/c5ff12b4a042"
  }];

  var pageIndex = req.query.page; // 通过 req.query获取请求参数
  var pageNumber = 3;
  var newsData = news.splice(pageIndex, pageNumber);
  res.send({
  	success: true, 
  	data: newsData
  });

});
