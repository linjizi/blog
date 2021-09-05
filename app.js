// 引入express模块
const express = require('express');
// 引入路径处理模块
const path = require('path');
// 引入body-parser模块
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
const { template } = require('express-art-template');
// 导入dateformate模块
const dateFormat = require('dateformat');
// 向模板导入dateFormat方法
template.defaults.imports.dateFormat = dateFormat;

// 创建网站服务器
const app = express();

// 连接数据库
require('./model/connect');
// 导入用户对象
const { User } = require('./model/user');
// 配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }));

// 配置中间件
app.use(session({
    secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name: 'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
    resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
    saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
        maxAge: 1000 * 60 * 24 * 60    /*过期时间*/
    },   /*secure https这样的情况才可以访问cookie*/
    //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
    // rolling: true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))

// 公开静态资源
app.use(express.static(path.join(__dirname, 'public')));
// 当渲染后缀为art的模板时，使用express-art-template模板
app.engine('art', require('express-art-template'));
// 设置模板默认存放路径
app.set('views', path.join(__dirname, 'views'));
// 设置模板默认后缀，默认拼接art后缀
app.set('view engine', 'art');

// 构建模块化路由
const admin = require('./route/admin');
const home = require('./route/home');

// 登录拦截
app.use('/admin', require('./middleware/loginGuard'));
// 匹配一级路径
app.use('/admin', admin);
app.use('/home', home);

// 监听端口
app.listen(80, () => {
    console.log('网站服务器启动成功');
})