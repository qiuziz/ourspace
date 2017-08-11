/*
 * @Author: qiuziz
 * @Date: 2017-08-11 17:52:19
 * */

const express = require('express');
const app = express();

app.listen(3100);

// 获取七牛云存储的照片地址
app.use('/api/getImgList', require('../server/getImgList'))