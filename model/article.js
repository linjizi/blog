// 引入mongoose模块
const mongoose = require('mongoose');
// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: [true, '请输入标题'],
        maxlength: 30,
    },
    "author": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    "publicDate": {
        type: Date,
        default: Date.now
    },
    "cover": {
        type: String,
        default: null
    },
    "content": {
        type: String,
        required: [true, '请输入内容']
    }
})

// 创建用户集合
const Article = mongoose.model('Article', articleSchema);

// 将文章集合作为模块成员导出
module.exports = {
    Article
}