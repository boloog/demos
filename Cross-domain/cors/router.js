app.get('/getNews', function (req, res) {
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

  var data = [];
  for (var i = 0; i < 5; i++) {
    var index = parseInt(Math.random() * news.length);
    data.push(news[index]);
    news.splice(index, 1);
  }

  // 限制当前请求http://a.code.com:8080可以获取数据
  res.header("Access-Control-Allow-Origin", "http://a.code.com:8080"); 
  // 接受任何请求
  // res.header("Access-Control-Allow-Origin", "*"); 
  res.send(data);
  
});