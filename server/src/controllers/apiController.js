// 'use strict'

const db = require('../config/db');

const fs = require('fs');

const { encryptPassword, comparePassword } = require('../config/pwd');
const { generateVerificationCode } = require('../config/yzm');
const { log } = require('console');

let successState = 0 // 表示成功
let failState = 1 // 表示失败


// 存储手机号和验证码以及过期时间的键值对
const verificationCodes = {};



// exports.test = (req, res) => {
//     console.log(req.query);
//     res.send({ name: '666', age: 11 })
// }





// 获取用户信息
exports.getuserinfo = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };
    // console.log(req.params);

    let user_id = req.params.id;
    let sql = "select * from user_info where user_id = " + user_id;
    console.log('获取用户：============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            // res.send(JSON.stringify(resObj))
            res.send(resObj)
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 新建商品
exports.createProductInfo = (req, res) => {

    // 上传的文件
    console.log(req.files);
    let resObj = { status: successState, message: '' };
    console.log(req.body);

    let data = req.body;
    let length = data.imgArr.length;
    let sql = `insert into product_info 
    (product_id, product_title, product_price, product_detail, product_status, product_owner, product_image, product_classify, product_district)
    values 
    ("${data.id}", "${data.title}", "${data.price}", "${data.detail}", "0", "${data.ownerId}", "${length}", "${data.classify}", "${data.district}")`;

    console.log('新建商品：============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 查询商品详细信息
exports.getProductDetail = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    console.log(req.params);

    let product_id = req.params.id;

    let sql = `select product_info.*,user_info.user_name from product_info,user_info where product_info.product_owner = user_info.user_id and product_id = ` + product_id;


    console.log('查询商品============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        console.log(datas[0].product_image);
        datas[0].imgArr = [];
        // datas[0].imgArr.push(`../../static/upload/${product_id}_${i}.png`);
        for (let i = 0; i < datas[0].product_image; i++) {
            datas[0].imgArr.push(`/upload/${product_id}_${i}.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 编辑商品详细信息
exports.editProductDetail = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    console.log(req.params);

    let data = req.body;
    let length = data.imgArr.length;

    let sql = `update product_info set product_title = "${data.title}", product_price = "${data.price}",
               product_detail = "${data.detail}", product_image = "${length}", product_classify = "${data.classify}",
               product_district = "${data.district}" where product_id = "${data.id}"`;

    console.log('编辑商品详细信息============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 图片上传
exports.upload = (req, res) => {
    let index = 0;
    // console.log("索引：" + req.body.id);
    // console.log("商品id：" + req.body.time);

    let time = Date.now();
    // 客户端上传的文件数组，包含了多个文件的文件名、文件类型等信息
    console.log("客户端上传的文件数组" + req.files);
    // 遍历客户端上传的文件数组，
    // 使用 fs.rename() 方法将每个本地临时文件重命名为服务器上的唯一文件名
    for (const i of req.files) {

        // 第一个参数为原始文件路径，第二个参数为新的文件路径。
        // 在这里，将原始文件路径中的文件名替换为格式为的新文件名，
        // 并同时将其保存到./ public / upload 目录下
        fs.rename("./src/public/upload/" + i.filename, "./src/public/upload/" + req.body.time + "_" + req.body.id + ".png", (err) => {
            console.log("每张图片：");
            console.log(i);
            // console.log("重命名之前：" + i.filename);
            if (err) {
                console.error(err)
                return
            } else {
                console.log('文件重命名成功')
            }
        })
        index++;
    }
    // res.send("success", req.files)
    res.send("success")
}

// 获取商品列表
exports.getProductList = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = "";
    // console.log(typeof req.params.id);
    // if (req.params.id !== 'undefined') {
    //     sql = `select product_id, product_title, product_price from product_info
    //   where product_status = 0 and product_owner != ${req.params.id} order by product_id DESC`;
    // } else {
    //     sql = `select product_id, product_title, product_price from product_info
    //     where product_status = 0 order by product_id DESC`;
    // }

    if (req.params.id !== 'undefined') {
        sql = `select product_id, product_title, product_price from product_info
      where product_status = 0 order by product_id DESC`;
    } else {
        sql = `select product_id, product_title, product_price from product_info
        where product_status = 0 order by product_id DESC`;
    }

    console.log('获取商品列表============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取用户商品列表
exports.getUserProduct = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    // let sql = `select product_id, product_title, product_price, product_status from product_info
    //                    where product_owner = ${req.params.id} 
    //                     or product_buyer = ${req.params.id} order by product_id DESC`
    let sql = `select product_id, product_title, product_price, product_status from product_info
                       where product_owner = ${req.params.id} order by product_id DESC`

    console.log('获取用户商品列表============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        // for (const i of datas) {
        //     i.imgArr = "../../static/upload/" + i.product_id + "_0.png";
        // }
        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 新建用户
exports.createUser = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };


    const phone = req.body.id;
    const verificationCode = req.body.code;

    console.log(phone, verificationCode);

    // 检查手机号格式和验证码是否正确
    if (!verificationCodes.hasOwnProperty(phone)) {
        res.status(401).send('Invalid phone number or verification code.');
        return;
    }
    const { code, expirationTime } = verificationCodes[phone];
    if (code !== verificationCode || Date.now() > expirationTime) {
        res.status(401).send('codeErr');
        return;
    }


    console.log(req.body.password);

    const pwd = encryptPassword(req.body.password);
    console.log("加密后的密码是" + pwd);


    // let sql = `insert into user_info values (null,"${req.body.id}", "${req.body.password}", "${req.body.username}", 2)`;

    let sql = `insert into user_info values (null,"${req.body.id}", "${pwd}", "${req.body.username}", 2)`;

    console.log('新建用户============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 登录
exports.logIn = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    // console.log(req.body);
    const { username, password } = req.body;


    let sql = `select * from user_info where user_id = "${username}"`;

    console.log('用户登录============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }


        if (datas.length === 0) {
            console.log("用户不存在");
            // resObj.status = failState
            // resObj.message = err.message
            // res.send(JSON.stringify(resObj))
            res.send("error")
            return
        }

        const pwd = datas[0].user_password;
        console.log(datas[0].user_password);

        console.log(comparePassword(password, pwd));

        console.log("*******");
        if (comparePassword(password, pwd)) {
            // 5.0 获取数据成功

            console.log("ddd");
            resObj.message = datas
            res.send(JSON.stringify(resObj))
            // res.send("success")
        }
        else {
            console.log("XXXXXXX");
            // resObj.status = failState
            // resObj.message = err.message
            // res.send(JSON.stringify(resObj))
            // return
            res.send("pwdErr")
        }


    })
}


// 发送验证码
exports.sendVerificationCode = (req, res) => {
    // console.log(req.body);
    const { phone } = req.body;
    // console.log(phone);
    const { code, expirationTime } = generateVerificationCode();
    // 将验证码及其过期时间存储到服务器端内存
    verificationCodes[phone] = { code, expirationTime };
    // console.log(code, expirationTime);
    // console.log(verificationCodes[phone]);
    // console.log(verificationCodes);

    console.log(`******${phone}的验证码是: ${code}******`);

    res.send('Verification code sent successfully.');

}



// 修改商品状态为交易中
exports.buyProduct = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `update product_info set product_status = 1, product_buyer = ${req.body.userid} where product_id = ${req.body.productid}`;
    console.log('修改商品状态为交易中============>', sql)


    // 检查是否出售
    let checksql = `select * from product_info where product_id = ${req.body.productid}`

    db.query(checksql, (err, datas) => {
        console.log(datas);
        console.log('当前商品的状态：' + datas[0].product_status);
        if (datas[0].product_status !== 0) {
            console.log('已售出!!!');
            res.send('yscErr')
            return;
        }
        else {
            db.query(sql, (err, datas) => {
                // 4.0 判断是否异常
                if (err) {
                    resObj.status = failState
                    resObj.message = err.message
                    res.send(JSON.stringify(resObj))
                    return
                }

                // 5.0 获取数据成功
                resObj.message = datas

                res.send(JSON.stringify(resObj))
            })
        }
    })


}

// 搜索商品列表
exports.searchItem = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    let sql = "";
    console.log(req.body.id);

    if (req.body.id) {
        // 登录后
        if (req.body.text && !req.body.status) {
            // 上架的商品
            console.log("case1");
            // sql = `select product_id, product_title, product_price from product_info
            //    where product_title like '%${req.body.text}%' and product_status = 0 
            //    and product_owner != ${req.body.id} order by product_id DESC`

            sql = `select product_id, product_title, product_price from product_info
               where product_title like '%${req.body.text}%' and product_status = 0 
               order by product_id DESC`

        } else {
            // 无搜索数据返回全部
            console.log("case2");
            // sql = `select product_id, product_title, product_price from product_info where product_status = 0
            //    and product_owner != ${req.body.id} order by product_id DESC`

            sql = `select product_id, product_title, product_price from product_info where product_status = 0 
            order by product_id DESC`
        }
    } else {
        if (req.body.text) {
            console.log("case3");
            sql = `select product_id, product_title, product_price from product_info
                  where product_title like '%${req.body.text}%' and product_status = 0 
                  order by product_id DESC`;
        } else {
            console.log("case4");
            sql = `select product_id, product_title, product_price from product_info where product_status = 0 order by product_id DESC`
        }
    }

    console.log('搜索商品列表============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// // 插入历史记录
// exports.setHistory = (req, res) => {
//     // 代表返回的数据结构
//     let resObj = { status: successState, message: '' };
//     console.log(req.body);
//     let sql = `select * FROM history where user_id = ${req.body.user} and product_id = ${req.body.product}`;
//     console.log('检查是否已有记录============>', sql)

//     db.query(sql, (err, datas) => {
//         // 4.0 判断是否异常
//         if (err) {
//             resObj.status = failState
//             resObj.message = err.message
//             res.send(JSON.stringify(resObj))
//             return
//         }

//         if (datas.length === 0) {
//             // 无数据 插入
//             console.log(123456);
//         } else {
//             // 有数据 返回
//             res.send(JSON.stringify(resObj))
//             return
//         }
//         let sql1 = `insert into history values (null,${req.body.product}, ${req.body.user})`;
//         console.log('插入历史记录============>', sql1)

//         db.query(sql1, (err, datas) => {
//             // 4.0 判断是否异常
//             if (err) {
//                 resObj.status = failState
//                 resObj.message = err.message
//                 res.send(JSON.stringify(resObj))
//                 return
//             }
//             resObj.message = datas
//         })

//         res.send(JSON.stringify(resObj))
//     })
// }

// 插入历史记录
exports.setHistory = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    console.log(req.body);
    let sql = `insert into history values (null,${req.body.product}, ${req.body.user})`;
    console.log('插入历史记录<============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }
        res.send(JSON.stringify(resObj))
    })
}


// 获取历史记录
exports.getHistory = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select * from history, product_info where user_id = ${req.params.id} and history.product_id = product_info.product_id`;
    console.log('获取历史记录<============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        for (const i of datas) {
            // console.log(i);
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }

        datas = datas.reverse();
        // console.log(datas);

        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 删除历史记录
exports.delHistory = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    const { history_id } = req.body;

    console.log(history_id);

    // let sql = `delete from history where user_id = ${req.body.userid} and product_id = ${req.body.productid}`;
    let sql = `delete from history where history_id = ${history_id}`;
    console.log('删除历史记录============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 删除商品
exports.delProduct = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql =
        `delete product_info,history from product_info,history where
        product_info.product_id = history.product_id and product_info.product_id = ${req.body.productid}`;
    console.log('删除商品============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 修改交易商品状态
exports.changeProductstatus = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    let sql = "";
    if (req.body.status == 0) {
        // 终止交易
        sql = `update product_info set product_status = 0,
      product_buyer = null where product_id = ${req.body.productid}`;
    } else {
        // 交易完成
        sql = `update product_info set product_status = ${req.body.status}
       where product_id = ${req.body.productid}`;
    }
    console.log('修改交易商品状态============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取所有商品列表
exports.getAllProductList = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select * from product_info order by product_id DESC`;

    console.log('获取所有商品列表============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        // for (const i of datas) {
        //     i.imgArr = "../../static/upload/" + i.product_id + "_0.png";
        // }
        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取购买的商品列表
exports.getBuy = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select product_id, product_title, product_price, product_status from product_info
                     where product_buyer = ${req.params.id} order by product_id DESC`

    console.log('获取购买的商品列表============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取交易中的商品
exports.tradingProduct = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select product_id, product_title, product_price, product_status from product_info
                     where product_owner = ${req.params.id} 
                      and product_status = 1 order by product_id DESC`

    console.log('获取交易中的商品============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        for (const i of datas) {
            // i.imgArr = (`/upload/${i.product_id}_0.png`);
            i.imgArr = `/upload/${i.product_id}_0.png`;

        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取售出的商品列表
exports.getSell = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select product_id, product_title, product_price, product_status from product_info
                     where product_owner = ${req.params.id} 
                      and product_status = 2 order by product_id DESC`

    console.log('获取售出的商品列表============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 修改用户
exports.changeUser = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    console.log(req.body.message);
    let sql = ``
    // 0-修改用户邮箱 1-修改手机号 其他-修改密码
    if (req.body.message == '0') {
        sql = `update user_info set user_name = "${req.body.text}" where user_id = ${req.body.id}`
    } else if (req.body.message == '1') {
        sql = `update user_info set user_id = "${req.body.text}" where user_id = ${req.body.id}`
    } else {
        sql = `update user_info set user_password = "${req.body.text}" where user_id = ${req.body.id}`
    }

    console.log('修改用户============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 添加关注商品
exports.addFollow = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };
    let sql1 = `select * from follow where product_id = ${req.body.productid} and user_id = ${req.body.userid}`

    console.log('检查是否已有记录============>', sql1)
    db.query(sql1, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        if (datas.length === 0) {
            // 无数据 插入
            console.log(123456);
        } else {
            // 有数据 返回
            res.send(JSON.stringify(resObj))
            return
        }

        let sql = `insert into follow values (null,"${req.body.productid}", "${req.body.userid}")`
        console.log('添加关注============>', sql)

        db.query(sql, (err, datas) => {
            // 4.0 判断是否异常
            if (err) {
                resObj.status = failState
                resObj.message = err.message
                res.send(JSON.stringify(resObj))
                return
            }
            resObj.message = datas
        })

        res.send(JSON.stringify(resObj))
    })
}

// 查询关注商品
exports.getFollow = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select * from follow, product_info where follow.product_id = product_info.product_id and 
              user_id = ${req.params.id}`

    console.log('查询关注商品============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }

        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 删除关注商品
exports.delFollow = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `delete from follow where product_id = ${req.body.productid} and user_id = ${req.body.userid}`

    console.log('删除关注商品============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 计算出售的商品
exports.calEarn = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select SUM(ROUND(product_price, 1)) as price from product_info where product_owner = ${req.params.id} and product_status = 2`

    console.log('计算出售的商品============>', sql)

    console.log("**********");
    console.log("**********");
    console.log("**********");
    console.log("**********");
    console.log("**********");
    console.log("**********");

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 查询是否已关注
exports.findFollow = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select * from follow where product_id = "${req.body.productid}" and user_id = "${req.body.userid}"`

    console.log('检查是否关注============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 获取商品分类列表
exports.getClassifyList = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = "";
    console.log(req.body.id);
    console.log(req.body.id !== undefined);
    // if (req.body.id !== undefined) {
    //     sql = `select product_id, product_title, product_price from product_info where product_status = 0 and 
    //     product_owner != '${req.body.id}' and product_classify = '${req.body.classify}' order by product_id DESC`;
    // } else {
    //     sql = `select product_id, product_title, product_price from product_info where product_status = 0 and
    //      product_classify = '${req.body.classify}' order by product_id DESC`;
    // }


    if (req.body.id !== undefined) {
        sql = `select product_id, product_title, product_price from product_info where product_status = 0 and 
        product_classify = '${req.body.classify}' order by product_id DESC`;
    } else {
        sql = `select product_id, product_title, product_price from product_info where product_status = 0 and
         product_classify = '${req.body.classify}' order by product_id DESC`;
    }

    console.log(req.body);
    console.log('获取商品分类列表============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        for (const i of datas) {
            i.imgArr = (`/upload/${i.product_id}_0.png`);
        }
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取用户所有信息
exports.getUserInfoNum = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: {} };

    let sqlArr = [
        // buy
        `select COUNT(product_buyer) as buy from product_info where product_buyer = ${req.body.id}`,
        // sell
        `select COUNT(product_id) as sell from product_info where product_status = 2 and product_owner = ${req.body.id}`,
        // follow
        `select COUNT(user_id) as follow from follow where user_id = ${req.body.id}`,
        // history
        `select COUNT(user_id) as history from history, product_info where user_id = ${req.body.id} and history.product_id = product_info.product_id`,
        // trading
        `select COUNT(product_owner) as trading from product_info where product_owner = ${req.body.id} and product_status = 1`,
        // earn
        `select SUM(ROUND(product_price, 1)) as price from product_info where product_owner = ${req.body.id} and product_status = 2`
    ];
    console.log('获取用户所有信息============>        start')
    let p = []
    for (const sql of sqlArr) {
        p.push(new Promise((resolve, reject) => {
            db.query(sql, (err, datas) => {
                // 4.0 判断是否异常
                if (err) {
                    resObj.status = failState
                    resObj.message = err.message
                    res.send(JSON.stringify(resObj))
                    reject(resObj)
                    return
                }

                // 5.0 获取数据成功
                if (datas[0].price === null) {
                    datas[0].price = "0";
                }
                // console.log(datas);
                console.log(datas[0]);
                resObj.message = Object.assign(resObj.message, datas[0])
                resolve(resObj)
            })
        }))
    }
    Promise.all(p).then(() => {
        // console.log(JSON.stringify(resObj));
        res.send(JSON.stringify(resObj))
        console.log('获取用户所有信息============>        send')
    });
}

// 获取所有用户信息
exports.getUserinfo = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };
    // console.log(req.params);

    let sql = "select * from user_info";
    console.log('获取所有用户信息============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 获取单个用户详细信息
exports.getUserDetail = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };
    // console.log(req.params);

    let sql = "select * from user_info where user_id = " + req.params.id;
    console.log('获取单个用户详细信息============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 删除用户
exports.delUser = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };
    // console.log(req.params);

    let sql = "delete from user_info where user_id = " + req.params.id;
    console.log('删除用户============>', sql)
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas
        res.send(JSON.stringify(resObj))
    })
}

// 修改用户
exports.editUser = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `update user_info set user_id = "${req.body.id}", user_name = "${req.body.name}", user_password = "${req.body.password}", user_role = "${req.body.role}" where user_id = "${req.body.preId}"`;
    console.log('修改用户============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// test
exports.test = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: [] };

    // resObj.message.push(123)
    res.send(JSON.stringify(resObj))
}

// 搜索分类
exports.searchClassify = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = ``;
    console.log('搜索分类============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}


// 获取轮播图
exports.getSwiper = (req, res) => {
    // 代表返回的数据结构
    let resObj = { status: successState, message: '' };

    let sql = `select * from swiper_info`;
    console.log('获取轮播图============>', sql)

    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}




// 发布求购商品
exports.postWantBuy = (req, res) => {
    // 代表返回的数据结构
    console.log(req.body);

    let resObj = { status: successState, message: '' };

    let wantBuyName = req.body.name;
    let wantBuyDetail = req.body.intro;
    let email = req.body.email;
    let user_id = req.body.user_id;

    let sql = `insert into wantbuy_info values(NULL,
        "${wantBuyName}","${wantBuyDetail}","${email}",0,${user_id})`;
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}


// 获取求购商品
exports.getWantBuyList = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    let sql = `select * from wantbuy_info where isBuy = 0`;
    db.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取求购商品详情
exports.getWantBuyDetail = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    console.log(req.params);

    let sql = `select * from wantbuy_info where id = ${req.params.id}`;

    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })
}


// 获取我的求购商品
exports.getMyWantBuyList = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    console.log(req.params);

    let sql = `select * from wantbuy_info where user_id = ${req.params.id} and isBuy = 0`;

    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })


}


// 获取我的求购商品
exports.deleteMyWantBuyItem = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    console.log(req.params);

    let sql = `update wantbuy_info set isBuy = 1 where id = ${req.params.id}`;

    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })


}


// 发布公告
exports.postNotice = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    const { title, content } = req.body;

    let sql = `insert into notice_info values (NULL,"${title}","${content}",0,CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP )`;

    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })


}


// 获取全部公告
exports.getAllNotice = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    let sql = 'select * from notice_info'
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })
}


// 获取公告详情
exports.getNoticeDetail = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    const { id } = req.params;
    // console.log(id);
    // console.log(req.params);

    let sql = `select * from notice_info where notice_id = ${id}`
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })
}

// 修改公告信息
exports.updateNotice = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    const { id, title, content } = req.body;
    console.log(id);
    // console.log(req.params);

    let sql = `update notice_info set notice_title =" ${title}" , notice_content = "${content}" ,update_time = CURRENT_TIMESTAMP
    where notice_id = ${id}`
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))

    })
}


// // 修改公告信息
// exports.updateNotice = (req, res) => {
//     // 代表返回的数据结构

//     let resObj = { status: successState, message: '' };

//     const { id, title, content } = req.body;
//     console.log(id);
//     // console.log(req.params);



//     let sql = `update notice_info set notice_title =" ${title}" , notice_content = "${content}" ,update_time = CURRENT_TIMESTAMP
//     where notice_id = ${id}`
//     db.query(sql, (err, datas) => {
//         if (err) {
//             resObj.status = failState
//             resObj.message = err.message
//             res.send(JSON.stringify(resObj))
//             console.log(err);
//             return
//         }
//         // 5.0 获取数据成功
//         resObj.message = datas

//         res.send(JSON.stringify(resObj))

//     })
// }


// 删除公告
exports.deleteNotice = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };


    // console.log(req.params);

    const { id } = req.params;
    console.log(id);

    let sql = `delete from notice_info where notice_id = ${id}`
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}


// 发布评论
exports.postComment = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };


    const { user_id, product_id, commentDetail } = req.body;

    console.log("评论详情：" + user_id + ' ' + product_id + ' ' + commentDetail);



    let sql = `insert into comment_info values (NULL,${product_id},${user_id},"${commentDetail}",CURRENT_TIMESTAMP)`
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}


// 获取评论
exports.getAllComment = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    console.log("++++++++++" + req.params.id);
    // console.log("++++++++-00" + req.body.id);
    const product_id = req.params.id;

    let sql = `select * from comment_info where product_id = ${product_id}`
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}

// 获取评论
exports.delComment = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    console.log(req.body);

    const { id } = req.body;

    let sql = `delete from comment_info where id = ${id}`
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}



// 修改邮箱
exports.changeEmail = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    // console.log(req.body);
    // console.log(req.params);

    const { id, email } = req.body;

    console.log(id);
    console.log(email);

    let sql = `update user_info set user_name = "${email}" where user_id = ${id}`
    console.log('修改邮箱==========>' + sql);
    db.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failState
            resObj.message = err.message
            res.send(JSON.stringify(resObj))
            console.log(err);
            return
        }
        // 5.0 获取数据成功
        resObj.message = datas

        res.send(JSON.stringify(resObj))
    })
}


// 修改密码
exports.changePwd = (req, res) => {
    // 代表返回的数据结构

    let resObj = { status: successState, message: '' };

    const { id, pwd } = req.body;



    // todo
}