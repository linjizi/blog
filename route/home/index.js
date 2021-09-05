// 引入Article集合构造函数
const { Article } = require('../../model/article');
// 引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 获取当前文章页数
    const { page } = req.query;
    // 查询所有文章
    const articles = JSON.parse(JSON.stringify(await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()));
    // res.send(articles);
    res.render('home/default', { articles });
}