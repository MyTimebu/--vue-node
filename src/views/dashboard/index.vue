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
    <tables />
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
      <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
    </el-row>
    <EightDiagrams />

    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import lable from './lable'
import TotalData from './TotalData'
import tables from './table/table'
import EightDiagrams from './EightDiagrams/EightDiagrams'
export default {
  name: 'Dashboard',
  components: {
    lable,
    TotalData,
    tables,
    EightDiagrams
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
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  // background: #99a9bf;
}
.bg-purple {
  // background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
