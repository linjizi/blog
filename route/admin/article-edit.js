// 引入Article集合构造函数
const { Article } = require('../../model/article');
module.exports = async (req, res) => {
    // 判断当前是文章管理还是用户管理的标识
    req.app.locals.flag = 'article';
    // 获取请求参数中的id
    const { id } = req.query;
    // 若id存在则是文章修改页面
    if (id) {
        const article = await Article.findOne({ _id: id });
        res.render('admin/article-edit', {
            article,
            button: '修改',
            link: '/admin/articleModify'
        });
    } else {
        // 若id不存在，发布新文章页面
        res.render('admin/article-edit', {
            button: '提交',
            link: '/admin/addArticle'
        });
    }

}