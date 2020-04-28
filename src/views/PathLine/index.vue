<template>
  <div class="test">
    <div ref="myEchart" class="className" />
    <img class="Img" src="../../assets/images/p.jpg">
    <!-- [[-6.775212010755666, 20], [-7.334694052771454, 29.770114942528735], [-13.80870053895417, 22.816091954022987], [-28.674937655373736, 24.25287356321839], [-28.99464167938276, 27.988505747126435], [-28.515085643369225, 30.74712643678161], [-36.26790822558803, 32.01149425287356], [-39.544874471680515, 30.402298850574713], [-39.22517044767149, 27.873563218390807], [-41.78280263974368, 25.344827586206897]] -->
    <!-- [[-9.01314017881883,20.919540229885058],[-12.290106424911315,14.022988505747128],[-3.178541740654161,11.321839080459771],[-9.412770208830104,10.172413793103448],[-11.73062438289552,6.436781609195402],[-29.793901739405317,5.862068965517241],[-36.98724227960833,7.873563218390805],[-37.866428345633146,11.781609195402298],[-26.037379457299295,11.551724137931034],[-21.1618930911617,12.241379310344826],[-20.922115073154927,14.540229885057471]] -->
    <!-- [[-8.61351014880755,20.402298850574713],[-10.451808286859432,9.25287356321839],[-18.044778857073723,5.689655172413794],[-28.99464167938276,5.977011494252874],[-37.786502339630886,6.264367816091953],[-39.62480047768277,12.816091954022987],[-38.58576239965345,15.689655172413792],[-32.191681919472984,14.597701149425289]] -->
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null,
      dataList: [],
      symbolSize: 20,
      zr: '',
      timer: null
    }
  },
  mounted() {
    // console.log();
    this.$nextTick(() => {
      this.initChart()
      this.xuanran()
    })
    // this.testClick()
    //  根据窗口大小调整曲线大小
    window.onresize = () => {
      this.chart.resize()
    }

    this.timer = setInterval(() => {
      const shuju1 = [[-6.775212010755666, 20], [-7.334694052771454, 29.770114942528735], [-13.80870053895417, 22.816091954022987], [-28.674937655373736, 24.25287356321839], [-28.99464167938276, 27.988505747126435], [-28.515085643369225, 30.74712643678161], [-36.26790822558803, 32.01149425287356], [-39.544874471680515, 30.402298850574713], [-39.22517044767149, 27.873563218390807], [-41.78280263974368, 25.344827586206897]]
      const shuju2 = [[-9.01314017881883, 20.919540229885058], [-12.290106424911315, 14.022988505747128], [-3.178541740654161, 11.321839080459771], [-9.412770208830104, 10.172413793103448], [-11.73062438289552, 6.436781609195402], [-29.793901739405317, 5.862068965517241], [-36.98724227960833, 7.873563218390805], [-37.866428345633146, 11.781609195402298], [-26.037379457299295, 11.551724137931034], [-21.1618930911617, 12.241379310344826], [-20.922115073154927, 14.540229885057471]]
      const shuju3 = [[-8.61351014880755, 20.402298850574713], [-10.451808286859432, 9.25287356321839], [-18.044778857073723, 5.689655172413794], [-28.99464167938276, 5.977011494252874], [-37.786502339630886, 6.264367816091953], [-39.62480047768277, 12.816091954022987], [-38.58576239965345, 15.689655172413792], [-32.191681919472984, 14.597701149425289]]
      const TestShuju = Math.ceil(Math.random() * 10)
      // console.log(TestShuju)
      if (TestShuju > 8) {
        this.dataList = shuju2
        this.xuanran()
      } else if (TestShuju > 5 && TestShuju < 8) {
        this.dataList = shuju1
        this.xuanran()
      } else if (TestShuju < 5) {
        this.dataList = shuju3
        this.xuanran()
      }
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
        // console.log(pointInPixel)

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
      // console.log(this.dataList)
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
            data: dataList
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
