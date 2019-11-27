<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <lable />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <TotalData />
        </div>
      </el-col>
    </el-row>
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import lable from './lable'
import TotalData from './TotalData'
export default {
  name: 'Dashboard',
  components: {
    lable,
    TotalData
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  padding: 35px;
  box-sizing: border-box;
  background: #EFF1F4;
}
.el-row {
  margin-bottom: 20px;
}
</style>
