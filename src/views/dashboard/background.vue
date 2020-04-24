<template>
  <div class="test">
    <div class="stars" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      data: [],
      symbolSize: 20,
      zr: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.testClick()
    })
  },
  beforeDestroy() {

  },
  methods: {
    testClick() {
      var stars = 800 /* 星星的密集程度，数字越大越多*/

      var r = 800 /* 星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
      // let shuju = ''
      for (var i = 0; i < stars; i++) {
        // var $star = $('<div/>').addClass('star')
        // shuju = `<div class='star'  />`
        const shu = document.createElement('div')
        shu.className = 'star'
        shu.style.width = ' 2px'
        shu.style.height = ' 2px'
        shu.style.background = ' #F7F7B6'
        shu.style.position = ' absolute'
        shu.style.top = '0'
        shu.style.left = ' 0'
        shu.style.backfaceVisibility = 'hidden'
        shu.style.transformOrigin = '0 0 -300px'
        shu.style.transform = 'translate3d(0, 0, -300px)'
        document.querySelector('.stars').appendChild(shu)
      }
      document.querySelectorAll('.star').forEach((item) => {
        var s = 0.2 + (Math.random() * 1)
        var curR = r + (Math.random() * 300)

        item.style.transformOrigin = `0 0 ${curR}px`
        item.style.transform = `translate3d(0,0,-${curR}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${s},${s})`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test{
  width: 100vw;
  height: 100vh;
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
  background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6);
  background-attachment: fixed;
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 1000px) {
  .className {
    display: none;
  }
}
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  .star {
    width: 2px;
    height: 2px;
    background: #F7F7B6;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0 -300px;
    transform: translate3d(0, 0, -300px);
    backface-visibility: hidden;
  }
}
.star {
  width: 2px;
  height: 2px;
  background: #F7F7B6;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0 -300px;
  transform: translate3d(0, 0, -300px);
  backface-visibility: hidden;
}
.className {
  width: 800px;
  height: 500px;
  z-index: 20;
  position: relative;
}
</style>
