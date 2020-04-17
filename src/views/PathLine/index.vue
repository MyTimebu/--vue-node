<template>
  <div class="test">
    <div ref="myEchart" class="className" />
    <img class="Img" src="../../assets/images/p.jpg">
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null,
      dataList: [
        [775, 391], [691, 368], [709, 260], [636, 341], [482, 333], [446, 292], [461, 226],
        [330, 187], [303, 240], [411, 222], [414, 276], [409, 367], [641, 371], [639, 535],
        [842, 565], [681, 597], [667, 651], [574, 658], [347, 650], [323, 556], [321, 491],
        [500, 488], [350, 505], [340, 537], [362, 569], [367, 608], [391, 625], [462, 631],
        [570, 632], [653, 625], [648, 590], [674, 486], [748, 415]
      ],
      symbolSize: 20,
      zr: ''
    }
  },
  mounted() {
    // console.log();
    this.initChart()
    this.xuanran()
    // this.testClick()
    //  根据窗口大小调整曲线大小
    window.onresize = () => {
      this.chart.resize()
    }
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
      this.zr = this.chart.getZr()
      this.zr.on('click', (params) => {
        var pointInPixel = [params.offsetX, params.offsetY]
        var pointInGrid = this.chart.convertFromPixel('grid', pointInPixel)
        console.log(pointInPixel)

        if (this.chart.containPixel('grid', pointInPixel)) {
          this.dataList.push(pointInGrid)
          this.xuanran()
        }
      })

      this.zr.on('mousemove', (params) => {
        var pointInPixel = [params.offsetX, params.offsetY]
        this.zr.setCursorStyle(this.chart.containPixel('grid', pointInPixel) ? 'copy' : 'default')
      })
    },
    xuanran() {
      console.log(this.dataList)
      // var points = []
      const dataList = this.dataList
      this.chart.setOption({
        title: {
          text: ''
        },
        tooltip: {
          formatter: function(params) {
            var data = params.data || [0, 0]
            return data[0].toFixed(2) + ', ' + data[1].toFixed(2)
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          show: false,
          min: -60,
          max: 20,
          type: 'value',
          axisLine: { onZero: false }
        },
        yAxis: {
          show: false,
          min: 0,
          max: 40,
          type: 'value',
          axisLine: { onZero: false }
        },
        series: [
          {
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: this.symbolSize,
            data: [
              [775, 391], [691, 368], [709, 260], [636, 341], [482, 333], [446, 292], [461, 226],
              [330, 187], [303, 240], [411, 222], [414, 276], [409, 367], [641, 371], [639, 535],
              [842, 565], [681, 597], [667, 651], [574, 658], [347, 650], [323, 556], [321, 491],
              [500, 488], [350, 505], [340, 537], [362, 569], [367, 608], [391, 625], [462, 631],
              [570, 632], [653, 625], [648, 590], [674, 486], [748, 415]
            ]
          }
        ]
      })
    },
    testClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
.test{
  // width: 100vw;
  // height: 100vh;
  position: relative;
  .Img{
    position: absolute;
    top: 0;
    left: 0px;
    width: 1100px;
    height: 800px;
    z-index: 1;
  }
}
@media screen and (max-width: 1000px) {
  .className {
    display: none;
  }
}
.className {
  width: 1100px;
  height: 800px;
  z-index: 20;
  position: relative;
}
</style>
