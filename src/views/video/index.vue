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
            poster="https://vjs.zencdn.net/v/oceans.png"
            data-setup="{}"
          >
            <!-- <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"> -->
            <source src="http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8" type="application/x-mpegURL">
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
    <footer>Footer</footer>
  </div>
</template>

<script>
import 'videojs-contrib-hls'
export default {
  name: 'Video',
  mounted() {
    this.$nextTick(() => {
      this.$video(document.getElementById('my-video'), {}, function() {
        this.play()
      })
    })
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
  height: 170px;
  background: #99a9bf;
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
