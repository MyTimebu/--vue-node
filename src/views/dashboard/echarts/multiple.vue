<template>
  <div class="category">
    <div class="className" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "category",
  props: {
    prop: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      props: {}
    };
  },
  mounted() {
    console.log(this.prop)
    this.initChart()
    this.xuanran(this.prop)
    //  根据窗口大小调整曲线大小
    window.onresize = () => {
      this.chart.resize();
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.resize()
    },
    xuanran(prop) {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        legend: {
          top: "25",
          data: ["2015 降水量", "2016 降水量"]
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: {
          data: ['一月','三月','五月','七月','九月','十一月'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "2015 降水量",
            type: "line",
            itemStyle: {
              normal: {
                color: '#FF995A',
                lineStyle: {
                  color: '#FF995A',
                  width: 2
                }
              }
            },
            smooth: true,
            data: prop.yw,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: "2016 降水量",
            type: "line",
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            data: prop.yl,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
        ]
      });
    }
  },
  watch: {
    prop: {
      handler(newVal, oldVal) {
        this.xuanran(newVal)
      },
      deep: true //对象内部属性的监听，关键。
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #f4f5f7;
  .className {
    height: 40vh;
    margin-top: 5vh;
  }
}
</style>