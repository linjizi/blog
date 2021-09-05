// 引入用户集合
const { User } = require('../../model/user');
// 导入bcryptjs模块
const bcrypt = require('bcryptjs');
module.exports = async (req, res) => {
    const { email, password } = req.body;
    // 根据邮箱地址的唯一性查询数据库中唯一的用户信息
    let user = await User.findOne({ email });
    // 判断用户输入的信息是否有效，用户是否存在，若否，则返回'邮箱地址或密码错误'信息，并重定向回登录页面
    if (email.trim().length == 0 || password.trim().length == 0 || !user) {
        return res.status(400).render('admin/error', { message: '邮箱地址或密码错误' });
    }
    // 邮箱地址存在，比对密码
    if (await bcrypt.compare(password, user.password) == false) {
        // 比对失败 登录失败
        return res.status(400).render('admin/error', { message: '邮箱地址或密码错误' });
    }
    // 将用户存储在请求对象中
    req.session.email = email;
    req.session.role = user.role;
    req.app.locals.userInfo = user;
    res.redirect('/admin/user');
}