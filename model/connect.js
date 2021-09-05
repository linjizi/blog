// 引入mongoose模块
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('数据库连接成功'); })
    .catch(() => { console.log('数据库连接失败'); });