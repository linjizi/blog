// 创建评论集合的构造函数
// 引入mongoose模块
const mongoose = require('mongoose');

// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    "comment": {
        type: String,
        required: [true, '请输入您要评论的内容']
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    "article": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    "publicTime": {
        type: Date,
        default: Date.now
    }
})

// 创建评论集合构造函数
const Comment = mongoose.model('Comment', commentSchema);

// 将评论集合构造函数作为模块成员导出
module.exports = {
    Comment
}