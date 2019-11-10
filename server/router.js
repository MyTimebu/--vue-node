// 1. 加载 express 模块
const express = require('express')

// 2. 创建路有对象
const router = express.Router()

// 加载 数据库操作模块
const db = require('./db.js')
// 加载其他会用到的模块
// const path = require('path')
// 加载moment模块
// const moment = require('moment')

// 3. 监听路由
//  http:// 127.0.0.1:3000/index 显示 index.html

// 监听 /addstu, 接收表单提交的数据并添加到student表中
router.post('/test', (req, res) => {
  console.log(req, res, '12321')
})
router.post('/user/login', (req, res) => {
  console.log(req)
})

// 监听 /modifystu
//  接收edit.html中表单提交的数据，拼接update的SQL语句，再执行，执行成功之后跳转回 /index
router.post('/modifystu', (req, res) => {
  // 表单数据以对象形式保存在 req.body 中
  // console.log(req.body)

  const sql = 'update student set ? where sno=?'
  db.query(sql, [req.body, req.body.sno], (err, result) => {
    if (err) {
      return console.log(err)
    }

    // 执行成功，跳转到 /index
    // res.redirect('/index')
  })
})

// 接收用户名和密码，验证用户名密码是否正确
router.post('/check', (req, res) => {
  // 1) 接收数据 --- 用户名和密码
  const username = req.body.username
  const userpwd = req.body.userpwd

  // 2) 编写SQL语句
  const sql = 'select * from users where user_name=? and user_pwd=?'

  // 3) 执行SQL语句
  db.query(sql, [username, userpwd], (err, result) => {
    console.log(err)
    // 4) 处理SQL执行结果
    // 核心: 判断查询结果有几条数据，
    //  1条说明用户名密码都正确，成功登录，跳转到 /index
    //  0条说明用户名或者密码错误，登录失败, 跳转回 /login
    //  就是判断result.length = 1 正确
    if (result.length === 1) {
      // 登录成功, 将用户信息和登录状态记录到session中
      req.session.isLogin = true
      req.session.user = result[0]
      //  req.session = {
      //      isLogin: true,
      //      user: {id:3, user_name:"zs", user_pwd:"123456"}
      //  }
      // res.redirect('/index')
    } else {
      // res.redirect('/login')
    }
  })
})

// 4. 导出router对象
module.exports = router
