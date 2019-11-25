<template>
  <div>
    <div class="luck">
      <div :class="first===1?'red':''">1</div>
      <div :class="first===2?'red':''">2</div>
      <div :class="first===3?'red':''">3</div>

      <div :class="first===8?'red':''">8</div>
      <div @click="test"></div>
      <div :class="first===4?'red':''">4</div>

      <div :class="first===7?'red':''">7</div>
      <div :class="first===6?'red':''">6</div>
      <div :class="first===5?'red':''">5</div>
    </div>  
  </div>  
</template>

<script>
export default {
  data() {
    return {
      index:1,
      first:1,
      timer:null,
      time:100,
      CycleNumber:0,
      TransferTimes:10,
      WinningThePrize:3
    }
  },
  methods:{
    test(){
      if(this.timer){
        return
      }
      this.timer=setInterval(()=>{
        this.first++
        if(this.CycleNumber === this.TransferTimes){
          this.time = 1000
          clearInterval(this.timer)
          this.test2()
        }
        if(this.first===8){
          setTimeout(()=>{
            this.first = 1
          },this.time)
          this.CycleNumber++
        }
      },this.time)
    },
    test2(){
      this.timer=setInterval(()=>{
        console.log(2)
        this.first++
        console.log(this.time)
        if(this.CycleNumber === this.TransferTimes){
          if(this.first===this.WinningThePrize){
            clearInterval(this.timer)
          }     
        }
        if(this.first===8){
          setTimeout(()=>{
            this.first = 1
          },this.time)
          this.CycleNumber++
        }
      },this.time)
    }
  }
}
</script>

<style lang="scss" scoped>
.luck {
  width: 30vw;
  height: 30vh;
  padding-top: 1vh;
  box-sizing: border-box;
  background: #f3f0f0;
  display: flex;
  flex-wrap: wrap;
  div{
    width: 7vw;
    height: 7vh;
    margin-left: 1vw;
    background: #acf2ff;
    border-radius: 10px;
    box-shadow: 0px 10px 1px #7cebff
  }
  .red{
    background: #2cdfff;
  }
}
</style>