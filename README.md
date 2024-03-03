# -
基于node.js的校园二手交易平台、基于uni-app的校园二手交易平台、express、node


### 基于node.js的校园二手交易平台

### 基于uni-app的校园二手交易平台


前后端代码请移步其他仓库
campus-second-hand-trading-platform---front
campus-second-hand-trading-platform---backend

注：图片无法显示，可查看文件夹下pdf。

可以丰富功能，用于毕业设计。

联系QQ：738881948




![](https://img1.imgtp.com/2023/07/12/MYyJzZxa.png)

### 创新点：

采用uni-app跨平台开发框架，一次编译，多端运行。可以运行在：移动端网页（已测试）、安卓（已测试）、ios、小程序等多个平台。将项目部署在服务器，可公网访问，丰富了用户的选择。



### 技术栈

**前端**：uni-app、vue2、

**后端**：node.js、express、mysql

![](https://img1.imgtp.com/2023/07/12/Cl5SxAoc.png)

### 整体架构

![](https://img1.imgtp.com/2023/07/12/GluSYdZ9.png)





### 程序截图



##### 登录注册

可接受手机验证码，防止恶意注册。

![](https://img1.imgtp.com/2023/07/12/2w79w7Bq.png)



##### 首页和个人中心

可改为推荐商品。加入推荐算法，这可以算作一个创新点。

![](https://img1.imgtp.com/2023/07/12/YwUamTem.png)



##### 发布商品、全部商品

可以搜索，翻页

![](https://img1.imgtp.com/2023/07/12/ZqpuKGen.png)



##### 商品详情

可以查看商品的详细信息。

评论商品，对于自己发布的评论，可以删除。

关注商品，购买商品。

![](https://img1.imgtp.com/2023/07/12/KrlTPWyE.png)





##### 交易

图一为购买者购买商品。

图二为商品发布者处理交易信息。

​		点击完成交易，商品自动下架，交易完成。

​		点击终止交易，商品重新上架到平台，交易结束。

![](https://img1.imgtp.com/2023/07/12/Cu7djgZE.png)









### 手机端展示，上面为移动端网页

![](https://img1.imgtp.com/2023/07/12/cwQi5W34.png)



#### 未登录无法操作

![](https://img1.imgtp.com/2023/07/12/moCEF83N.png)



#### 可以浏览商品图片，保存图片

![](https://img1.imgtp.com/2023/07/12/cLnAnpc2.png)



#### 交易信息通知

按钮有些偏，可以稍加修改。

![](https://img1.imgtp.com/2023/07/12/yFWackTx.png)





#### 我发布的所有商品

点击可以查看详情，修改商品信息，下架商品。

右下角显示交易状态。

共三种状态： 已上架、交易中、已完成

![](https://img1.imgtp.com/2023/07/12/txeMKmnI.png)



### 常见问题：

Q1：有无支付功能？

A1：无，本系统面向校园在校学生。可以线上选货，线下交易，无需支付功能。



Q2：怎么公网访问？

A2：后端为node项目，采用PM2部署在云服务器。

​		前端移动端网页打包后，用nginx部署。	

​		安卓端直接打包生成apk安装包，安装即可。

