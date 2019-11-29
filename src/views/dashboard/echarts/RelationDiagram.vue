<template>
  <div style="width:100%">
    <div class="className" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import 'echarts-gl'
export default {
  data() {
    return {
      chart: null,
      props: {}
    };
  },
  mounted() {
    console.log(this.prop);
    this.initChart();
    this.xuanran(this.prop);
    //  根据窗口大小调整曲线大小
    // window.onresize = () => {
    //   this.xuanran();
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
      // this.chart.resize();
    },
    xuanran(prop) {
      function createNodes(widthCount, heightCount) {
        var nodes = [];
        for (var i = 0; i < widthCount; i++) {
          for (var j = 0; j < heightCount; j++) {
            nodes.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              value: 1
            });
          }
        }
        return nodes;
      }

      function createEdges(widthCount, heightCount) {
        var edges = [];
        for (var i = 0; i < widthCount; i++) {
          for (var j = 0; j < heightCount; j++) {
            if (i < widthCount - 1) {
              edges.push({
                source: i + j * widthCount,
                target: i + 1 + j * widthCount,
                value: 1
              });
            }
            if (j < heightCount - 1) {
              edges.push({
                source: i + j * widthCount,
                target: i + (j + 1) * widthCount,
                value: 1
              });
            }
          }
        }
        return edges;
      }

      var nodes = createNodes(50, 50);
      var edges = createEdges(50, 50);
      this.chart.setOption({
          series: [{
              type: 'graphGL',
              nodes: nodes,
              edges: edges,
              itemStyle: {
                color: 'rgba(255,255,255,0.8)'
              },
              lineStyle: {
                color: 'rgba(255,255,255,0.8)',
                width: 3
              },
              forceAtlas2: {
                steps: 5,
                jitterTolerence: 10,
                edgeWeightInfluence: 4
              }
          }]
      });
    }
  },
  watch: {
    prop: {
      handler(newVal, oldVal) {
        this.xuanran(newVal);
      },
      deep: true //对象内部属性的监听，关键。
    }
  }
};
</script>

<style lang="scss" scoped>
.className{
  width: 100%;
  height: 500px;
}
</style>
