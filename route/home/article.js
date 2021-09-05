// 引入Article文章集合构造函数
const { Article } = require('../../model/article');
// 引入Comment评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    // 获取文章id
    const { id } = req.query;
    // 查询该文章
    const article = await Article.findOne({ _id: id }).populate('author').lean();
    // 查询该文章的所有评论
    const comments = await Comment.find({ article: id }).populate('user').lean();
    // res.send(comments);
    res.render('home/article', { article, comments });
}