// 引入Article集合构造函数
const { Article } = require('../../model/article');
// 引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 判断当前是文章管理还是用户管理的标识
    req.app.locals.flag = 'article';
    // 获得当前文章列表页数
    const { page } = req.query;
    // 查询数据库文章列表
    const articles = JSON.parse(JSON.stringify(await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()));
    // res.send(articles);
    res.render('admin/article', { articles });
}