// 导入用户验证规则
const { User, schame } = require('../../model/user');
// 引入bcryptjs模块
const bcrypt = require('bcryptjs');
module.exports = async (req, res) => {
    // 结构获得用户输入的邮箱地址，密码
    const { email, password } = req.body;
    // 验证
    try {
        await schame.validateAsync(req.body);
    } catch (e) {
        // 验证失败，返回用户编辑页面，并显示错误提示
        return res.status(400).redirect('/admin/user-edit?message=' + e.message);
    }
    // 验证成功，查询数据库，判断邮箱地址是否已被注册
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).redirect('/admin/user-edit?message=邮箱地址已被注册');
    }
    // 邮箱地址没有被注册过，新增用户成功，将用户信息存入数据库
    // 给用户输入的密码加密
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    // 将加密后的密码存入req.body中
    req.body.password = pass;
    // 将req.body存入数据库
    User.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
}