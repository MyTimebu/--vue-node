// 1. 加载 express 模块
const express = require('express')

// 2. 创建服务器
const app = express()

// var ws = require('socket.io') // 引入socket.io

// 3. 启动服务器
const server = app.listen(3000, () => {
  console.log('服务器启动')
})

// var io = ws(server) // http服务与ws服务相关联, 返回io服务实例

// // 监听用户的连接事件
// io.on('connection', function(socket) {
//   // 发生在用户连接io服务器时
//   console.log('有新用户进入房间')

//   // 消息发送事件
//   socket.on('message', function(obj) {
//     console.log(obj)
//     io.emit('message', obj) // 发送消息给所有客户端（广播）
//   })
// })

app.all('*', function(req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() === 'options') {
    res.send(200) // 让options尝试请求快速结束
  } else {
    next()
  }
})

// 加载express-art-template模块并配置
// const template = require('express-art-template')
// app.engine('html', template)

// 加载 body-parser 模块, 注册为中间件
const bp = require('body-parser')
app.use(bp.urlencoded({ extended: false }))

// 加载 express-session 模块，并注册为中间件
const session = require('express-session')
app.use(session({
  secret: '4ey32erfyf3fgpg', // 加密字符串。 使用该字符串来加密session数据，自定义
  resave: false, // 强制保存session即使它并没有变化
  saveUninitialized: false// 强制将未初始化的session存储。当新建了一个session且未
// 设定属性或值时，它就处于未初始化状态。
}))

const router = require('./router.js')
const websocket = require('./websocket.js')
app.use(router,websocket.router)
websocket.wss
