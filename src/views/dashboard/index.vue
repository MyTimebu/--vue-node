<template>
  <div class="dashboard-container">
    <lable />
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import lable from './lable'
export default {
  name: 'Dashboard',
  components: {
    lable
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
</style>
