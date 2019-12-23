<template>
  <div class="TotalData">
    <div>
      <RelationDiagram />
    </div>
    <div>
      <test />
    </div>
  </div>
</template>

<script>
import RelationDiagram from './echarts/RelationDiagram'
import test from './echarts/test'
export default {
  components: {
    RelationDiagram,
    test
  }
}
</script>

<style lang="scss" scoped>
.TotalData{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  div{
    border-radius: 10px;
    background: #000;
    &:nth-of-type(1){
      width: 49%;
      border-radius: 10px;
    }
    &:nth-of-type(2){
      width: 49%;
      overflow: hidden;
      border-radius: 10px;
    }
  }
}
@media screen and (max-width: 900px) {
  .TotalData{
    width: 100%;
    div{
      border-radius: 10px;
      background: #000;
      &:nth-of-type(1){
        width: 100%;
        border-radius: 10px;
      }
      &:nth-of-type(2){
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .TotalData{
    display: none;
    div{
      border-radius: 10px;
      background: #000;
      &:nth-of-type(1){
        width: 100%;
        border-radius: 10px;
      }
      &:nth-of-type(2){
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
      }
    }
  }
}
// @media screen and (max-width: 900px) {
//   .TotalData{
//     display: none
//   }
// }
</style>
