// 1. 加载 express 模块
const express = require('express')
// 2. 创建路有对象
const router = express.Router()
const ws = require('ws')
const SocketServer = ws.Server
const wss = new SocketServer({ port: 8090 }) // 创建websocketServer实例监听8090端口
const clients = []
var id = ''
var name = ''
var conns = []
/**
 * 广播所有客户端消息
 * @param  {String} type     广播方式(admin为系统消息，user为用户消息)
 * @param  {String} message  消息
 * @param  {String} nickname 用户昵称，广播方式为admin时可以不存在
 */
function broadcastSend(obj) {
  clients.forEach(function(v, i) {
    console.log('群发')
    if (v.ws.readyState === ws.OPEN) {
      v.ws.send(JSON.stringify(obj))
    }
  })
}

router.post('/user/list', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })

  req.on('end', function() {
    // 将字符串转换位一个对象
    var dataString = alldata.toString()
    // console.log(JSON.parse(dataString))
    const data = JSON.parse(dataString)
    id = data.id
    name = data.name
    clients.forEach((item, index) => {
      if (Number(item.id) === Number(data.id)) {
        name = ''
      }
    })
    // 将接收到的字符串转换位为json对象
    // var dataObj = querystring.parse(dataString)
    // // 输出数据
    // console.log(dataObj)
    const status = { code: 20000, message: '一切正常', data: clients }
    res.json(status)
  })
})
// 监听连接
wss.on('connection', function(ws) {
  if (name !== '') {
    clients.push({
      'id': id,
      'ws': ws,
      'nickname': name
    })
    var obj = {
      'type': 'message',
      'nickname': name,
      'message': '',
      'id': id
    }
    conns = []
    broadcastSend(obj)
  }
  /**
   * 关闭服务，从客户端监听列表删除
   */
  function closeSocket() {
    clients.forEach((item, index) => {
      if (Number(item.id) === Number(id)) {
        console.log('连接断开111')

        var disconnect_message = `${item.nickname} 已经下线`
        var obj = {
          'type': 'message',
          'nickname': item.nickname,
          'message': disconnect_message
        }
        conns = []
        broadcastSend(obj)
        clients.splice(index, 1)
      }
    })
  }
  /* 监听消息*/
  ws.on('message', function(obj) {
    const objs = JSON.parse(obj)
    if (!objs.id) {
      var objse = {
        'type': 'message',
        'nickname': objs.name,
        'message': objs.content + '群发'
      }
      conns = []
      broadcastSend(objse)
    } else {
      var objst = {
        'type': 'message',
        'nickname': objs.name,
        'message': objs.content + '單发'
      }
      String(objs.id).split('&').forEach((item, index) => {
        clients.forEach((v, i) => {
          if (Number(clients[i].id) === Number(objs.id.split('&')[index])) {
            // console.log(v.nickname)
            v.ws.send(JSON.stringify(objst))
          }
        })
      })
    }
  })
  /* 监听断开连接*/
  ws.on('close', function(obj) {
    // console.log(obj,'-----断开连接的人员id')
    closeSocket()
  })
  ws.on('error', function(code, reason) {
    console.log('异常关闭')
  })
})
module.exports = { wss, router }
