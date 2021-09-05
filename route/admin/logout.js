// 引入express-session模块
const session = require('express-session');
module.exports = (req, res) => {
    req.session.destroy(() => {
        // 删除cookie
        res.clearCookie('session_id');
        res.redirect('/admin/login');
        // 清除模板中的用户信息
        req.app.locals.userInfo = null;
    })
}