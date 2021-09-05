// 引入express模块
const express = require('express');
// 创建路由对象
const admin = express.Router();
// 导入User集合
const { User } = require('../model/user');

// 登录页面
admin.get('/login', require('./admin/loginIndex'));
// 展示用户列表页面
admin.get('/user', require('./admin/userPage'));
// 用户信息修改/添加用户页面展示
admin.get('/user-edit', require('./admin/user-edit'));
// 完成用户登录功能
admin.post('/login', require('./admin/login'));
// 完成新增用户功能
admin.post('/addUser', require('./admin/addUser'));
// 完成修改用户信息功能
admin.post('/userModify', require('./admin/userModify'));
// 完成退出登录功能
admin.get('/logout', require('./admin/logout'));
// 完成删除用户功能
admin.get('/deleteUser', require('./admin/deleteUser'));

// 展示文章列表页面
admin.get('/article', require('./admin/articlePage'));
// 文章编辑页面展示
admin.get('/article-edit', require('./admin/article-edit'));
// 完成发布新文章功能
admin.post('/addArticle', require('./admin/addArticle'));
// 完成文章修改功能
admin.post('/articleModify', require('./admin/articleModify'));
// 完成文章删除功能
admin.get('/deleteArticle', require('./admin/deleteArticle'));

// 将admin路由对象作为模块成员进行导出
module.exports = admin;