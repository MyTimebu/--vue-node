
// 建立连接
var ws = new WebSocket('ws://localhost:8090')
var nickname = ''
ws.onopen = function(e) {
  console.log('Connection to server opened')
}
// 显示消息
function appendLog(type, nickname, message) {
  if (typeof message === 'undefined') return
  var preface_label
  var message_text
  console.log(
    preface_label,
    message_text
  )
}
// 收到消息处理
ws.onmessage = function(e) {
  var data = JSON.parse(e.data)
  nickname = data.nickname
  appendLog(data.type, data.nickname, data.message)
  console.log('ID: [%s] = %s', data.id, data.message)
}
// 监听连接关闭情况
ws.onclose = function(e) {
  appendLog('Connection closed')
  console.log('Connection closed')
}
// 发送消息
function sendMessage() {
  var messageField = document.getElementById('message')
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(messageField.value)
  }
  messageField.value = ''
  messageField.focus()
}
// 修改名称
// function changName() {
//   var name = $('#name').val()
//   if (ws.readyState === WebSocket.OPEN) {
//     ws.send('/nick' + name)
//   }
// }
