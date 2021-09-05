// 引入用户集合
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 判断当前是文章管理还是用户管理的标识
    req.app.locals.flag = 'user';
    // 获取请求参数中的id属性
    const { id, message } = req.query;
    if (id) {
        // 查询当前需要修改信息的用户
        const user = await User.findOne({ _id: id });
        // id存在，则是修改用户页面
        res.render('admin/user-edit', {
            message,
            link: '/admin/userModify?id=' + id,
            button: '修改',
            user
        });
    } else {
        // id不存在，新增用户页面
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/addUser',
            button: '提交'
        });
    }
}