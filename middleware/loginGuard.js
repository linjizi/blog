module.exports = (req, res, next) => {
    // 判断当前用户是否访问login页面
    if (req.url != '/login' && !req.session.email) {
        // 用户在未登录的状态下访问login以外的界面
        return res.redirect('/admin/login');
    } else {
        // 如果是普通用户登录，当用户访问admin一级路由下登录页面以外的页面时，将页面跳转至首页
        if (req.session.role == 'normal') {
            return res.redirect('/home');
        }
    }
    next();
}