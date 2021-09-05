// 引入mongoose模块
const mongoose = require('mongoose');
// 引入bcriptjs模块
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    // normal:普通用户 admin:超级管理员
    role: {
        type: String,
        default: 'normal'
    },
    // 0:启用 1:禁用
    state: {
        type: Number,
        default: 0
    }
})
// 创建用户集合
const User = mongoose.model('User', userSchema);
// 初始化用户
// User.create({
//     username: 'itheima',
//     email: 'itheima@itcast.cn',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }, (err, doc) => {
//     console.log(err);
//     console.log(doc);
// })

async function createUser() {
    var salt = await bcrypt.genSalt(10);
    var pass = await bcrypt.hash('123456', salt);
    await User.create({
        username: 'itheima',
        email: 'itheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    }, (err, doc) => {
        console.log(err);
        console.log(doc);
    })
}
// createUser();

// 创建验证规则
const schame = Joi.object({
    username: Joi.string().required().min(2).max(20).error(new Error('用户名格式不符合验证规则')),
    email: Joi.string().required().error(new Error('邮箱格式不符合验证规则')),
    password: Joi.string().min(6).required().error(new Error('密码格式不符合验证规则')),
    role: Joi.string(),
    state: Joi.number()
})

// 将User集合作为模块参数进行导出
module.exports = {
    User,
    schame
}