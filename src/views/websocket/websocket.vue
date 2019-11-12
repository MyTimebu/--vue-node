<template>
  <div style="display: flex;">
    <div class="sidebar-left">
      <div v-for="(item,index) in userList" :key="index" @click="ids=item.id" class="left-name">
        <img src="@/assets/images/1.jpeg">
        <div class="name">{{item.id}}---{{item.nickname}}</div>
        <div class="content">测试热数据只为测试使用内容有限暂时这样</div>
        <div class="time">08:31</div>
      </div>
    </div>
    <div class="sidebar-right">
      <div class="top">
        <div v-for="(item,index) in contents" :key="index" :class="item.nickname != name?'ChatContent':'ChatContent-right'">{{item.nickname}}:{{item.message}}</div>
        <!-- <div class="ChatContent-right">{{names}}:{{message}}</div> -->
      </div>
      <div class="bottom">
        <div class="Label">1</div>
        <div class="InputPanel" ref="divcontent" contenteditable="true">1</div>
        <el-button type="primary" @click="sendMessage" size="small">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
export default {
  data() {
    return {
      MessageContent:'',
      content:'',
      ws : new WebSocket("ws://localhost:8090"),
      message:'',
      names:'',
      userList:[],
      ids: '',
      contents:[]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.list()
    this.init()
  },
  mounted(){
    setInterval(()=>{
       // 收到消息处理
       console.log(123)
      this.ws.onmessage = (e)=> {
        var data = JSON.parse(e.data)
        console.log(data)
        var nickname = data.nickname
        this.appendLog(data.type, data.nickname, data.message)
        console.log('ID: [%s] = %s', data.id, data.message)
      }
    },2000)
  },
  methods: {
    list(){
      // console.log(this.name.split('').length)
      let name = this.name
      let id = this.name.split('').length
      let data = {
        id,
        name
      }
      request({
        url: '/user/list',
        method: 'post',
        data
      }).then(response => {
        const { data } = response
        console.log(data)
        this.userList = data
      }).catch(error => {
        reject(error)
      })
    },
    init(){
      // let ws = new WebSocket("ws://localhost:8090");
      this.ws.onopen = function (e) {
        console.log('Connection to server opened');
      }
      // 收到消息处理
      this.ws.onmessage = (e)=> {
        var data = JSON.parse(e.data)
        console.log(data)
        var nickname = data.nickname
        this.appendLog(data.type, data.nickname, data.message)
        console.log('ID: [%s] = %s', data.id, data.message)
      },
      this.ws.onclose = (e)=> {
        this.appendLog('Connection closed')
        console.log('Connection closed')
      }
    },
    appendLog(type, nickname, message) {
      if (typeof message === 'undefined') return
      this.contents.push({nickname,message})
      // var preface_label
      // var message_text
      // console.log(
      //   preface_label,
      //   message_text,'----------------'
      // )
    },
    // 发送消息
    sendMessage() {
      // let this.ws = new WebSocket("ws://localhost:8090");
      if (this.ws.readyState === WebSocket.OPEN) {
        console.log(this.$refs.divcontent.innerHTML)
        let shuju = JSON.stringify({content:this.$refs.divcontent.innerHTML,id:this.ids+'&'+this.name.split('').length,name:this.name})
        this.ws.send(shuju)
      }
      this.$refs.divcontent.innerHTML = ''
      // messageField.focus()
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
    height: 55vh;
    background: #fdfafa;
    .ChatContent-right{
      text-align: right;
    }
  }
  .bottom{
    width: 100%;
    height: 30vh;
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
      bottom: 10px;
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
