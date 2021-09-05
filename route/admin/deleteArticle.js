// 引入文章集合构造函数
const { Article } = require('../../model/article');
module.exports = async (req, res) => {
    // 删除数据库中文章的信息
    await Article.findOneAndDelete({ _id: req.query.id });
    // 将页面重定向回用户列表页面
    res.redirect('/admin/article');
}