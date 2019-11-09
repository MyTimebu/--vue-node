<template>
  <div class="NavigationRecord">
    <HappyScroll color="rgba(0,0,0,0.5)" size="5" resize>
      <div class="NavigationRecord2">
        <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
          <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
          <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
          <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>

      </div>
    </HappyScroll>
  </div>
</template>

<script>
import { HappyScroll } from 'vue-happy-scroll'
export default {
components:{
    HappyScroll
  },
}
</script>

<style scoped>
.NavigationRecord{
  width: 200px;
  height: 140px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  white-space:nowrap;
  padding: 3px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
/* .NavigationRecord2{
  overflow-x: auto;
  overflow-y: hidden;
  white-space:nowrap;
} */

.el-button--info{
  width: 15px;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
.el-button--info:nth-of-type(1){
  float: left;
  z-index: 9999;
}
.el-button--info:nth-of-type(2){
  float: right;
  z-index: 9999;
}
.el-tag{
  margin-left: 10px;
}
.el-tag:hover{
  cursor: pointer;
}
</style>
