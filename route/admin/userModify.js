// 引入joi模块
const Joi = require('joi');
// 引入bcryptjs模块
const bcrypt = require('bcryptjs');
// 引入User用户集合
const { User, schame } = require('../../model/user');
module.exports = async (req, res) => {
    // 获取当前要修改信息的用户id
    const { id } = req.query;
    // 验证用户修改后的信息是否符合验证规则
    try {
        await schame.validateAsync(req.body);
    } catch (e) {
        // 不符合重定向回修改用户信息页面
        return res.status(400).redirect('/admin/user-edit?id=' + id + '&message=' + e.message);
    }
    // 查询当前要修改信息的用户
    const user = await User.findOne({ _id: id });
    // 判断用户输入的密码是否正确
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).redirect('/admin/user-edit?id=' + id + '&message=密码输入错误，修改信息失败');
    };
    // 假定用户修改的信息包括邮箱地址，考虑到邮箱地址的唯一性，必须保证邮箱地址未被注册过
    const u = await User.findOne({ _id: { $ne: id }, email: req.body.email });
    // 如果被注册过，则u能被查询到
    if (u) {
        return res.status(400).redirect('/admin/user-edit?id=' + id + '&message=邮箱地址已被注册');
    }
    // 更新文档前重新对密码进行加密
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);
    // 将加密后的密码覆盖req.body中的密码
    req.body.password = pass;
    // 更新文档，即更新用户信息
    await User.updateOne({ _id: id }, req.body);
    // 重定向回用户列表首页
    res.redirect('/admin/user');
}