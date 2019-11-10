<template>
  <div style="display: flex;">
    <div class="sidebar-left">
      <div class="left-name">
        <img src="@/assets/images/1.jpeg">
        <div class="name">先随便写一个</div>
        <div class="content">测试热数据只为测试使用内容有限暂时这样</div>
        <div class="time">08:31</div>
      </div>
    </div>
    <div class="sidebar-right">
      <div class="top">
        <div class="ChatContent">123</div>
        <div class="ChatContent-right">321</div>
      </div>
      <div class="bottom">
        <div class="Label">1</div>
        <div class="InputPanel" contenteditable="true">1</div>
        <el-button type="primary" size="small">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import socket from 'socket.io'
export default {
  data() {
    return {

    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      var socket = io.connect("http://localhost:3000/") //连接聊天室的io服务器 io服务器的根地址

      var oText = document.getElementById("text")
      var oBtn = document.getElementById("btn")

      var myMessage = ""

      oBtn.onclick = function () {
        var mes = oText.value

        // 当消息为空时
        if(!mes){
          return
        }
        myMessage = mes
        socket.send(mes) // 发送消息到服务器
        oText.value = "" // 清空文本框
      }

      // 当服务器广播消息时，触发message事件，消息内容在回调函数中
      socket.on('message',function (mm) {
        var p = document.createElement('p')
        p.innerText = mm
        if(myMessage === mm){
          p.style.cssText = "color:red;margin-left:10%"
        }
        document.body.appendChild(p)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar-left{
  width: 260px;
  height: calc(100vh - 90px);
  border-right: 1px #f8f8f8 solid;
  background: rgba(168, 223, 223, 0.349);
  .left-name{
    width: 100%;
    height: 50px;
    background: #a2cccc;
    box-sizing: border-box;
    border-top: 1px #ececec solid;
    position: relative;
    img{
      width: 30px;
      position: absolute;
      top: 8px;
      left: 10px;
    }
    .name{
      width: 90px;
      color: #a0ffff;
      font-size: 10px;
      position: absolute;
      top: 11px;
      left: 45px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .content{
      width: 150px;
      color: #cbecff;
      font-size: 10px;
      position: absolute;
      top: 27px;
      left: 45px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .time{
      color: #faffc8;
      font-size: 10px;
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
  .left-name:hover{
    cursor: pointer;
  }
  .left-name:nth-last-child(1){
    border-bottom: 1px #ececec solid;
  }
}
.sidebar-right{
  height: calc(100vh - 90px);
  background: rgba(139, 213, 255, 0.349);
  .top{
    width: 100%;
    height: 60vh;
    background: #fdfafa;
    .ChatContent-right{
      text-align: right;
    }
  }
  .bottom{
    width: 100%;
    height: 100%;
    border-top: 1px rgb(204, 204, 204) solid;
    box-sizing: border-box;
    background: rgba(208, 253, 251, 0.021);
    position: relative;
    .Label{
      width: 100%;
      height: 35px;
      background: #fdfafa;
    }
    .InputPanel{
      width: 100%;
      height: calc(100% - 35px);
    }
    .el-button--primary{
      position: absolute;
      top: 200px;
      right: 30px;
    }
  }
}
.openSidebar .sidebar-right{
  width: calc(100vw - 260px - 210px);
  transition: 0.5s;
}
.hideSidebar .sidebar-right{
  width: calc(100vw - 260px - 54px);
  transition: 0.5s;
}
</style>
