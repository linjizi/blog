// 引入express模块
const express = require('express');
// 创建路由对象
const home = express.Router();

// 展示首页
home.get('/', require('./home/index'));
// 展示文章详情页面
home.get('/article', require('./home/article'));
// 完成文章评论功能
home.post('/comment', require('./home/comment'));
// 将admin路由对象作为模块成员进行导出
module.exports = home;