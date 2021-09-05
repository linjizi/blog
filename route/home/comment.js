// 引入Comment评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    // 将评论信息存入数据库
    await Comment.create(req.body);
    // 重定向回文章详情页面
    res.redirect('/home/article?id=' + req.body.article);
}