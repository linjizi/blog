// 引入User用户集合
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 删除数据库中用户的信息
    await User.findOneAndDelete({ _id: req.query.id });
    // 将页面重定向回用户列表页面
    res.redirect('/admin/user');
}