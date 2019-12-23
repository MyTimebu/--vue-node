<template>
  <div id="app">
    <router-view />
    <menus v-if="shows" style="position: fixed; top:0;" />
  </div>
</template>

<script>
import menus from './components/menu/menu'
export default {
  name: 'App',
  components: {
    menus
  },
  data() {
    return {
      shows: false
    }
  },
  mounted() {
    var mybody = document.getElementsByTagName('body')[0]
    var h = document.documentElement.clientHeight
    mybody.style.height = h + 'px'
    // var mybody = document.getElementsByTagName('body')[0]
    // 滑动处理
    var startX, startY, moveEndX, moveEndY, X, Y
    mybody.addEventListener('touchstart', function(e) {
      // e.preventDefault()
      startX = e.touches[0].pageX
      startY = e.touches[0].pageY
    }, false)
    const then = this
    mybody.addEventListener('touchmove', function(e) {
      // e.preventDefault()
      moveEndX = e.changedTouches[0].pageX
      moveEndY = e.changedTouches[0].pageY
      X = moveEndX - startX
      Y = moveEndY - startY
      if (Math.abs(X) > Math.abs(Y) && X > 100) {
        then.shows = true
        const body = document.querySelector('#app')
        // body.style.height = '100%'
        // body.style.overflow = 'hidden'
        // alert('向右')
      } else if (Math.abs(X) > Math.abs(Y) && X < -100) {
        then.shows = false
        const body = document.querySelector('#app')
        body.style.height = ''
        body.style.overflow = ''
        // alert('向左')
      } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        // alert('向下')
      } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        // alert('向上')
      } else {
        // alert('没滑动')
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mb-4{
  position: fixed;
  right: 0;
  bottom: 0;

}
</style>
