<template>
  <div>
    <div class="lable">
      <div class="ren">
        <i class="el-icon-s-custom"></i>
        <center>
          <p ref='countup'><count-to :start-val="0" :end-val="580" :duration="3200" /></p>
          <p>登陆人数</p>
        </center>
      </div>
      <div class="code">
        <i class="el-icon-s-order"></i>
        <center>
          <p ref='countup'><count-to :start-val="0" :end-val="280" :duration="3200" /></p>
          <p>代码量</p>
        </center>
      </div>
      <div class="xing">
        <i class="el-icon-star-on"></i>
        <center>
          <p ref='countup'><count-to :start-val="0" :end-val="880" :duration="3200" /></p>
          <p>星星</p>
        </center>
      </div>
      <div class="yinqing">
        <i class="el-icon-s-help"></i>
        <center>
          <p ref='countup'><count-to :start-val="0" :end-val="9280" :duration="3200" /></p>
          <p>引擎</p>
        </center>
      </div>
    </div>
    <multiple></multiple>
  </div>
  
</template>

<script>
import CountTo from 'vue-count-to'
import multiple from './echarts/multiple'
export default {
  name: 'lable',
  components: {
    CountTo,
    multiple
  },
  data() {
    return {
      trem: '',
      options: {
        startVal: 1000
      },
      endCount: 2019
    }
  },
  mounted () {
  },
  methods: {
    handleSetLineChartData(type) {
      // this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.openSidebar .lable{
  div{
    width: 19vw;
    height: 110px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #f4f5f7;
    position: relative;
    i{
      position: absolute;
      top: 20px;
      left: 10px;
      font-size: 50px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
@media screen and (max-width: 1565px) { 
  .openSidebar .lable{
    div{
      width: 18vw;
      height: 110px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 1px 1px 1px #f4f5f7;
      position: relative;
      i{
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 50px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
@media screen and (max-width: 1250px) { 
  .openSidebar .lable{
    div{
      width: 37vw;
      height: 110px;
      background: #fff;
      margin-top: 2vh;
      border-radius: 10px;
      box-shadow: 1px 1px 1px #f4f5f7;
      position: relative;
      i{
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 50px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
@media screen and (max-width: 1140px) { 
  .openSidebar .lable{
    div{
      width: 35vw;
      height: 110px;
      background: #fff;
      margin-top: 2vh;
      border-radius: 10px;
      box-shadow: 1px 1px 1px #f4f5f7;
      position: relative;
      i{
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 50px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
.hideSidebar .lable{
  div{
    width: 21vw;
    height: 110px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #f4f5f7;
    position: relative;
    i{
      position: absolute;
      top: 20px;
      left: 10px;
      font-size: 50px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
@media screen and (max-width: 1175px) { 
  .hideSidebar .lable{
    div{
      width: 43vw;
      height: 110px;
      background: #fff;
      margin-top: 2vh;
      border-radius: 10px;
      box-shadow: 1px 1px 1px #f4f5f7;
      position: relative;
      i{
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 50px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
}
@media screen and (max-width: 400px) { 
  .hideSidebar .lable{
    div{
      width: 100vw;
      height: 110px;
      background: #fff;
      margin-top: 2vh;
      border-radius: 10px;
      box-shadow: 1px 1px 1px #f4f5f7;
      position: relative;
      i{
        position: absolute;
        top: 20px;
        left: 10px;
        font-size: 50px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
} 
.lable{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div{
    position: relative;
    >center{
      position: absolute;
      padding: 10px;
      padding-right: 25px;
      box-sizing: border-box;
      right: 0;
      top: 12px;
      p{
        margin: 0;
        margin-top: 10px;
      }
      p:nth-of-type(1){
        color: #4c9196;
        font-weight: 550;
      }
      p:nth-of-type(2){
        color: #4c7896;
        font-weight: 800;
      }
    }
  }
}
.ren{
  i{
    color: rgb(0, 225, 255);
  }
}
.ren:hover{
  i{
    font-size: 50px;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    background: rgb(0, 225, 255);
  }
  cursor: pointer;
}
.code{  
  i{
    color: rgb(255, 217, 0);
  }
}
.code:hover{
  i{
    font-size: 50px;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    background: rgb(255, 217, 0);
  }
  cursor: pointer;
}
.xing{  
  i{
    color: rgb(255, 0, 255);
  }
}
.xing:hover{
  i{
    font-size: 50px;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    background: rgb(255, 0, 255);
  }
  cursor: pointer;
}
.yinqing{
  i{
    color: rgb(0, 255, 55);
  }
}
.yinqing:hover{
  i{
    font-size: 50px;
    color: rgb(255, 255, 255);
    border-radius: 10px;
    background: rgb(0, 255, 55);
  }
  cursor: pointer;
}
</style>
