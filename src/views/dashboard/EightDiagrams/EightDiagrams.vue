<template>
  <div>
    <div ref="myEchart" class="className" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // console.log(this.prop);
    this.initChart()
    this.xuanran(this.prop)
    //  根据窗口大小调整曲线大小
    // window.onresize = () => {
    //   this.chart.resize();
    // };
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.resize()
    },
    xuanran(prop) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: [
            '挂',
            '数量',
            '册数',
            '书本',
            '直达',
            '营销广告',
            '搜索引擎',
            '邮件营销',
            '联盟广告',
            '视频广告',
            '百度',
            '谷歌',
            '必应',
            '其他'
          ]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: ['90', '35%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 100, selected: true },
              { value: 100, selected: true },
              { value: 100, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 100, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: ['80', '15%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 100, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 100, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 100, selected: true },
              { value: 50, selected: true },
              { value: 50, selected: true },
              { value: 100, selected: true }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 100, name: '直达', selected: true },
              { value: 50, name: '邮件营销', selected: true },
              { value: 50, name: '联盟广告', selected: true },
              { value: 100, name: '挂', selected: true },
              { value: 100, name: '视频广告', selected: true },
              { value: 50, name: '数量', selected: true },
              { value: 50, name: '册数', selected: true },
              { value: 50, name: '书本', selected: true },
              { value: 50, name: '百度', selected: true },
              { value: 100, name: '谷歌', selected: true },
              { value: 50, name: '必应', selected: true },
              { value: 50, name: '其他', selected: true }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .className{
    display: none
  }
}
.className{
  width: 100%;
  height: 700px;
  position: relative;
}
</style>
