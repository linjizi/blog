// 引入formidable模块
const formidable = require('formidable');
// 引入path路径处理模块
const path = require('path');
// 引入Articles文章集合构造函数
const { Article } = require('../../model/article');
module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 是否保留表单上传文件的扩展名
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        // 对files的路径进行处理
        const path = files.cover.path.split('public')[1];
        // 将信息存入数据库
        await Article.updateOne({
            title: fields.title,
            author: fields.author,
            publicDate: fields.publicDate,
            cover: path,
            content: fields.content
        })
    })
    // 将页面重定向回文章列表页面
    res.redirect('/admin/article');
}