<template>
  <div class="app-container" style="padding-bottom:0">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            muted
            poster="https://vjs.zencdn.net/v/oceans.png"
            data-setup="{}"
          >
            <!-- <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> -->
            <source :src="footerVideo.src" type="application/x-mpegURL">
            <!-- <source src="MY_VIDEO.webm" type="video/webm"> -->
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
              >supports HTML5 video</a>
            </p>
          </video>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    </el-row>
    <footer>
      <div @click="switchs(1)">
        CCTV1
        <div :class="footerVideoID==1?'bofang':'bofang2'">{{ footerVideoID==1?'播放中':'未播放' }}</div>
      </div>
      <div @click="switchs(2)">
        CCTV3
        <div :class="footerVideoID==2?'bofang':'bofang2'">{{ footerVideoID==2?'播放中':'未播放' }}</div>
      </div>
      <div @click="switchs(3)">
        CCTV5
        <div :class="footerVideoID==3?'bofang':'bofang2'">{{ footerVideoID==3?'播放中':'未播放' }}</div>
      </div>
      <div @click="switchs(4)">
        CCTV5+
        <div :class="footerVideoID==4?'bofang':'bofang2'">{{ footerVideoID==4?'播放中':'未播放' }}</div>
      </div>
      <div @click="switchs(5)">
        CCTV6
        <div :class="footerVideoID==5?'bofang':'bofang2'">{{ footerVideoID==5?'播放中':'未播放' }}</div>
      </div>
    </footer>
  </div>
</template>

<script>
import 'videojs-contrib-hls'
export default {
  name: 'Video',
  data() {
    return {
      footerVideo: {
        src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
        type: 'application/x-mpegURL'
      },
      footerVideoID: 1,
      switchsFooterVideo: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.switchsFooterVideo = this.$video(document.getElementById('my-video'), {}, function() {
        this.play()
      })
    })
  },
  methods: {
    switchs(i) {
      // this.switchsFooterVideo = null
      let SRCURL
      if (i === 1) {
        SRCURL = 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
      }
      if (i === 2) {
        SRCURL = 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'
      }
      if (i === 3) {
        SRCURL = 'http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8'
      }
      if (i === 4) {
        SRCURL = 'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8'
      }
      if (i === 5) {
        SRCURL = 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'
      }
      this.footerVideo = SRCURL
      this.footerVideoID = i
      this.switchsFooterVideo.src(SRCURL)
      this.switchsFooterVideo.ready(function() {
        this.switchsFooterVideo.play()
      })
      // this.switchsFooterVideo.play()
      // this.switchsFooterVideo.load()
      // this.switchsFooterVideo.dispose()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  height: calc(100vh - 90px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
footer{
  display: flex;
  align-items: center;
  height: 170px;
  background: #99a9bf;
  overflow-x: auto;
  >div{
    width: 230px;
    height: 160px;
    margin-left: 20px;
    line-height: 160px;
    text-align: center;
    background: #000;
    color: #f9fafc;
    font-weight: 800;
    border-radius: 10px;
    text-shadow: 0px 1px 20px #fff;
    cursor: pointer;
    position: relative;
    .bofang{
      width: 50px;
      height: 18px;
      border-radius: 20px;
      line-height: 18px;
      text-align: center;
      background: #00c77b;
      font-weight: 0;
      text-shadow: 0px 0px 0px #fff;
      position: absolute;
      left: 5px;
      top: 8px;
      font-size: 10px;
    }
    .bofang2{
      width: 50px;
      height: 18px;
      border-radius: 20px;
      line-height: 18px;
      text-align: center;
      background: #0088c7;
      font-weight: 0;
      text-shadow: 0px 0px 0px #fff;
      position: absolute;
      left: 5px;
      top: 8px;
      font-size: 10px;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  flex: 1;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 100%;
  .video-js{
    width: 100%;
    height: 100%;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
