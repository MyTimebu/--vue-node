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
      data: [],
      symbolSize: 20,
      zr: ''
    };
  },
  mounted() {
    // console.log(this.prop);
    this.initChart();
    this.xuanran(this.prop);
    // this.testClick()
    //  根据窗口大小调整曲线大小
    // window.onresize = () => {
    //   this.chart.resize();
    // };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.resize();
      this.zr = this.chart.getZr()
      this.zr.on('click', (params) => {
          var pointInPixel = [params.offsetX, params.offsetY];
          var pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);

          if (this.chart.containPixel('grid', pointInPixel)) {
              this.data.push(pointInGrid);
              this.xuanran()
              // this.chart.setOption({
              //     series: [{
              //         id: 'a',
              //         data: this.data
              //     }]
              // });
          }
      });

      this.zr.on('mousemove', (params) => {
          var pointInPixel = [params.offsetX, params.offsetY];
          this.zr.setCursorStyle(this.chart.containPixel('grid', pointInPixel) ? 'copy' : 'default');
      });
      console.log(1)
    },
    xuanran(prop) {
      console.log(2)

      var points = [];
      this.chart.setOption({
        title: {
          text: ''
        },
        tooltip: {
          formatter: function(params) {
            var data = params.data || [0, 0];
            return data[0].toFixed(2) + ", " + data[1].toFixed(2);
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          show: false,
          min: -60,
          max: 20,
          type: "value",
          axisLine: { onZero: false }
        },
        yAxis: {
          show: false,
          min: 0,
          max: 40,
          type: "value",
          axisLine: { onZero: false }
        },
        series: [
          {
            id: "a",
            type: "line",
            smooth: true,
            symbolSize: this.symbolSize,
            data: this.data
          }
        ]
      });
    },
    testClick() {


    }
  }
};
</script>

<style lang="scss" scoped>
.test{
  width: 100vw;
  height: 100vh;
  position: relative;
  .Img{
    position: absolute;
    top: 0;
    left: 0px;
    width: 800px;
    height: 500px;
    z-index: 1;
  }
}
@media screen and (max-width: 1000px) {
  .className {
    display: none;
  }
}
.className {
  width: 800px;
  height: 500px;
  z-index: 20;
  position: relative;
}
</style>
