const express = require('express');
const multer = require('multer');
const route = express.Router();

const apiCtrl = require("../controllers/apiController.js")
// test 接口
route.get('/api/test', apiCtrl.test);



// 获取用户信息
route.get('/api/getuserinfo/:id', apiCtrl.getuserinfo)

// 创建商品信息
route.post('/api/createProductInfo', apiCtrl.createProductInfo)

// 查询商品详细信息
route.get('/api/getProductDetail/:id', apiCtrl.getProductDetail)

// 查询商品详细信息
route.post('/api/editProductDetail', apiCtrl.editProductDetail)

// 上传图片文件
// multer 是一个 Node.js 中的中间件，
// 用于处理 multipart / form - data 类型的 HTTP 请求。
// 调用 multer({ ...}).any() 方法表示
// 可以接受客户端发送的任意类型的多媒体文件，
// 且这些文件将被存储在./ public / upload 目录下。
route.post('/api/upload', multer({
    dest: './src/public/upload',
    // limits: {
    //     fileSize: 5120
    // }
}).any(), apiCtrl.upload)
// 这个是里面的文件夹dest: './src/public/upload'



// 获取商品列表
route.get('/api/getProductList/:id', apiCtrl.getProductList)

// 获取用户商品列表
route.get('/api/getUserProduct/:id', apiCtrl.getUserProduct)

// 新建用户
route.post('/api/createUser', apiCtrl.createUser)

// 发送验证码
route.post('/api/sendVerificationCode', apiCtrl.sendVerificationCode)

// 用户登录
route.post('/api/logIn', apiCtrl.logIn)

route.post('/api/changePwd', apiCtrl.changePwd)

// 修改商品状态为交易中
route.post('/api/buyProduct', apiCtrl.buyProduct)

// 搜索商品列表
route.post('/api/searchItem', apiCtrl.searchItem)

// 插入历史记录
route.post('/api/setHistory', apiCtrl.setHistory)

// 获取历史记录
route.get('/api/getHistory/:id', apiCtrl.getHistory)

// 删除历史记录
route.post('/api/delHistory', apiCtrl.delHistory)

// 删除商品
route.post('/api/delProduct', apiCtrl.delProduct)

// 修改交易商品状态
route.post('/api/changeProductstatus', apiCtrl.changeProductstatus)

// 获取所有商品列表
route.get('/api/getAllProductList', apiCtrl.getAllProductList)

// 获取购买的商品列表
route.get('/api/getBuy/:id', apiCtrl.getBuy)

// 获取售出的商品列表
route.get('/api/getSell/:id', apiCtrl.getSell)

// 获取交易中的商品
route.get('/api/tradingProduct/:id', apiCtrl.tradingProduct)

// 修改用户id
route.post('/api/changeUser', apiCtrl.changeUser)

// 添加关注商品
route.post('/api/addFollow', apiCtrl.addFollow)

// 查询关注商品
route.get('/api/getFollow/:id', apiCtrl.getFollow)

// 删除关注商品
route.post('/api/delFollow', apiCtrl.delFollow)

// 计算出售的商品
route.get('/api/calEarn/:id', apiCtrl.calEarn)

// 查询是否已关注
route.post('/api/findFollow', apiCtrl.findFollow)

// 获取商品分类列表
route.post('/api/getClassifyList', apiCtrl.getClassifyList)

// 获取用户所有信息
route.post('/api/getUserInfoNum', apiCtrl.getUserInfoNum)

// 获取所有用户信息
route.get('/api/getUserinfo', apiCtrl.getUserinfo)

// 获取单个用户详细信息
route.get('/api/getUserDetail/:id', apiCtrl.getUserDetail)

// 删除用户
route.get('/api/delUser/:id', apiCtrl.delUser)

// 修改用户
route.post('/api/editUser', apiCtrl.editUser)

// 搜索分类
route.post('/api/searchClassify', apiCtrl.searchClassify)

// 获取轮播图
route.post('/api/getSwiper', apiCtrl.getSwiper)

// 发布求购商品
route.post('/api/postWantBuy', apiCtrl.postWantBuy)

// 获取求购商品列表
route.post('/api/getWantBuyList', apiCtrl.getWantBuyList)

// 获取求购商品详情
route.post('/api/getWantBuyDetail/:id', apiCtrl.getWantBuyDetail)

// 获取我的求购商品
route.post('/api/deleteMyWantBuyItem/:id', apiCtrl.deleteMyWantBuyItem)

// 删除我的求购商品
route.post('/api/getMyWantBuyList/:id', apiCtrl.getMyWantBuyList)

// 发布公告
route.post('/api/postNotice', apiCtrl.postNotice)

// 获取全部公告
route.post('/api/getAllNotice', apiCtrl.getAllNotice)

// 获取公告详情
route.post('/api/getNoticeDetail/:id', apiCtrl.getNoticeDetail)

// 修改公告信息
route.post('/api/updateNotice', apiCtrl.updateNotice)

// 删除公告
route.post('/api/deleteNotice/:id', apiCtrl.deleteNotice)

// 发表评论
route.post('/api/postComment', apiCtrl.postComment)

// 获取评论
route.get('/api/getAllComment/:id', apiCtrl.getAllComment)

// 删除评论
route.post('/api/delComment', apiCtrl.delComment)

// 修改邮箱
route.post('/api/changeEmail', apiCtrl.changeEmail)


// test
route.post('/api/test', apiCtrl.test)




module.exports = route



// module.exports = route;