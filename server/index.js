let http = require('http');
 
let user = require('./database/db').user; //mongo model
let privateHistory = require('./database/db').privateHistory;
let groupHistory = require('./database/db').groupHistory
let socketId = [],users = []//用账号对应客户端 储存socket连接
 
let server = http.createServer(function (req, res) {
}).listen(3000);//创建http服务
 
console.log('Server running ');
var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => { //监听客户端连接，返回当前socket
  console.log('链接成功'+ socket.id);
  user.find({},function (err,docs) { //在user关联的表中查找所有数据
    socket.emit('allUsers',docs) //给当前客户端发送广播
  })
 
 
socket.on('login', (data) => {})

sockets: { //所有广播的监听必须写在sockets中
  allUsers (docs) {
    this.$store.state.allusers = docs //储存到vuex中
  }
}