const ws = require('ws')
const SocketServer = ws.Server
const wss = new SocketServer({ port: 8090 }) // 创建websocketServer实例监听8090端口
const clients = []
/**
 * 广播所有客户端消息
 * @param  {String} type     广播方式(admin为系统消息，user为用户消息)
 * @param  {String} message  消息
 * @param  {String} nickname 用户昵称，广播方式为admin时可以不存在
 */
function broadcastSend(type, message, nickname) {
  clients.forEach(function(v, i) {
    if (v.ws.readyState === ws.OPEN) {
      v.ws.send(JSON.stringify({
        'type': type,
        'nickname': nickname,
        'message': message
      }))
    }
  })
}
// 监听连接
wss.on('connection', function(ws) {
  var id = Date.parse(new Date())
  var name = Date.parse(new Date()) + '测试员'
  clients.push({
    'id': id,
    'ws': ws,
    'nickname': name
  })

  console.log(`client ${id}connected`)
  /**
   * 关闭服务，从客户端监听列表删除
   */
  function closeSocket() {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === id) {
        var disconnect_message = `${name} has disconnected`
        broadcastSend('notification', disconnect_message, name)
        clients.splice(i, 1)
      }
    }
  }
  /* 监听消息*/
  ws.on('message', function(message) {
    if (message.indexOf('/nick') === 0) {
      var nickname_array = message.split(' ')
      if (nickname_array.length >= 2) {
        var old_nickname = name
        name = nickname_array[1]
        var nickname_message = `Client ${old_nickname} change to ${name}`
        broadcastSend('nick_update', nickname_message, name)
      }
    } else {
      broadcastSend('message', message, name)
    }
  })
  /* 监听断开连接*/
  ws.on('close', function() {
    closeSocket()
  })
})

module.exports = wss
