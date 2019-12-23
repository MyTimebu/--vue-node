<template>
  <div style="width:100%" class="category">
    <div ref="myEchart" class="className" />
  </div>
</template>

<script>
import echarts from 'echarts'
import world from './wlord'
import 'echarts-gl'
export default {
  name: 'Category',
  data() {
    return {
      chart: null,
      props: {}
    }
  },
  mounted() {
    this.initChart()
    this.xuanran()
    window.addEventListener('keydown', () => {
      this.chart.dispatchAction({
        type: 'lines3DToggleEffect',
        seriesIndex: 0
      })
    })
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
    },
    xuanran() {
      // app.title = "65k+ 飞机航线";
      const data = require('./figlts.json')
      function getAirportCoord(idx) {
        return [data.airports[idx][3], data.airports[idx][4]]
      }
      // console.log(data.routes)
      var routes = data.routes.map(function(airline) {
        return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
      })

      this.chart.setOption({
        geo3D: {
          map: 'world',
          shading: 'realistic',
          silent: true,
          environment: '#333',
          realisticMaterial: {
            roughness: 0.8,
            metalness: 0
          },
          postEffect: {
            enable: true
          },
          groundPlane: {
            show: false
          },
          light: {
            main: {
              intensity: 1,
              alpha: 30
            },
            ambient: {
              intensity: 0
            }
          },
          viewControl: {
            distance: 70,
            alpha: 89,
            panMouseButton: 'left',
            rotateMouseButton: 'right'
          },

          itemStyle: {
            areaColor: '#000'
          },

          regionHeight: 0.5
        },
        series: [
          {
            type: 'lines3D',

            coordinateSystem: 'geo3D',

            effect: {
              show: true,
              trailWidth: 1,
              trailOpacity: 0.5,
              trailLength: 0.2,
              constantSpeed: 5
            },

            blendMode: 'lighter',

            lineStyle: {
              width: 0.2,
              opacity: 0.05
            },

            data: routes
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #f4f5f7;
  .className{
    height: 500px;
    border-radius: 10px;
  }
}
</style>
