
const express = require('express');

const path = require('path');

const cors = require('cors');

const app = express();

const bodyParser = require('body-parser')


// 托管静态资源
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('D:\\Desktop\\server\\public'))

// console.log(path.join(__dirname, 'public'));

// console.log(__dirname+);

app.use(cors())

// 注册 body-parser 中间件
app.use(bodyParser({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: false }));

// 设置路由规则
const apiRoute = require('./routes/apiRoute.js')
app.use('/', apiRoute)

app.listen(9001, () => {
    console.log('服务已启动 http:127.0.0.1:8999');
})