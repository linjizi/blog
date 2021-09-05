// 引入User集合
const { User } = require('../../model/user');
// 引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    // 判断当前是文章管理还是用户管理的标识
    req.app.locals.flag = 'user';
    // 获得请求参数中的列表当前页
    const { page } = req.query;
    // 查询当前页用户列表信息
    pagination(User).page(page).size(10).display(5).exec().then(result => {
        res.render('admin/user', { result });
    })
}