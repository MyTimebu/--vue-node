
<template>
  <div class="yangshi">
    <div id="demo" class="header">
      <div class="top_logo" />
      <div class="canvaszz" />
      <canvas id="canvas" />
    </div>

    <div class="can">
      <canvas id="canvass" width="500" height="500" />
    </div>
    <div class="luckCenter">
      <div class="luck">
        <div :class="first===1?'red':''">一等奖</div>
        <div :class="first===2?'red':''">二等奖</div>
        <div :class="first===3?'red':''">三等奖</div>

        <div :class="first===8?'red':''">谢谢参与</div>
        <div @click="test" />
        <div :class="first===4?'red':''">四等奖</div>

        <div :class="first===7?'red':''">再来一次</div>
        <div :class="first===6?'red':''">六等奖</div>
        <div :class="first===5?'red':''">五等奖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Luck',
  data() {
    return {
      index: 1,
      first: 1,
      timer: null,
      time: 100,
      CycleNumber: 0,
      TransferTimes: 10,
      WinningThePrize: 3
    }
  },
  created() {

  },
  mounted() {
    this.canvas()
    this.canvasBackground()
  },
  methods: {
    test() {
      if (this.timer) {
        return
      }
      this.timer = setInterval(() => {
        this.first++
        if (this.CycleNumber === this.TransferTimes) {
          this.time = 1000
          clearInterval(this.timer)
          this.test2()
        }
        if (this.first === 8) {
          setTimeout(() => {
            this.first = 1
          }, this.time)
          this.CycleNumber++
        }
      }, this.time)
    },
    test2() {
      this.timer = setInterval(() => {
        console.log(2)
        this.first++
        console.log(this.time)
        if (this.CycleNumber === this.TransferTimes) {
          if (this.first === this.WinningThePrize) {
            clearInterval(this.timer)
          }
        }
        if (this.first === 8) {
          setTimeout(() => {
            this.first = 1
          }, this.time)
          this.CycleNumber++
        }
      }, this.time)
    },
    canvas() {
      var canvas = document.getElementById('canvass')
      // console.log(canvas)
      var ctx = canvas.getContext('2d')
      ctx.strokeStyle = '#7FFFD4'
      ctx.lineWidth = 3
      ctx.shadowBlur = 5
      ctx.shadowColor = '#7FFFD4'
      var milliseconds = 0
      var minutes = 0
      var hour = 0
      var date = ''
      var ctxBack = canvas.getContext('2d')
      var numBack = canvas.getContext('2d')
      ctxBack.lineWidth = 1
      ctxBack.shadowBlur = 0
      ctxBack.shadowColor = '#F0F8FF'
      function pageInit() {
        showTime()
        showBack()
        drawSecPin()
        drawMinPin()
        drawHouPin()
        setPoint()
        setNum()
      }
      function setNum() {
        numBack.save()
        numBack.translate(250, 250)
        numBack.beginPath()
        numBack.fillStyle = '#7FFFD4'
        numBack.font = '30px Helvetica'
        for (var i = 0; i < 60; i++) {
          if (i % 5 === 0) {
            numBack.lineWidth = 5
            var xPoint = Math.sin(i * 6 * 2 * Math.PI / 360) * 195
            var yPoint = -Math.cos(i * 6 * 2 * Math.PI / 360) * 195
            numBack.fillText(i === 0 ? 12 : i / 5, i === 0 ? -15 : xPoint - 10, i === 0 ? -185 : i <= 30 ? yPoint + 5 : yPoint + 10)
          }
        }
        numBack.stroke()
        numBack.closePath()
        numBack.restore()
      }
      function drawSecPin() {
        ctxBack.save()
        ctxBack.translate(250, 250)
        ctxBack.rotate(milliseconds / 60 * 2 * Math.PI)
        ctxBack.beginPath()
        ctxBack.strokeStyle = '#AFEEEE'
        ctxBack.lineWidth = 1
        ctxBack.lineJoin = 'bevel'
        ctxBack.miterLimit = 10
        ctxBack.moveTo(0, 30)
        ctxBack.lineTo(3, -175)
        ctxBack.lineTo(13, -165)
        ctxBack.lineTo(0, -210)
        ctxBack.lineTo(-13, -165)
        ctxBack.lineTo(-3, -175)
        ctxBack.lineTo(0, 30)
        ctxBack.stroke()
        ctxBack.closePath()
        ctxBack.restore()
      }
      function drawMinPin() {
        ctxBack.save()
        ctxBack.translate(250, 250)
        ctxBack.rotate(minutes * 6 * Math.PI / 180)
        ctxBack.beginPath()
        ctxBack.strokeStyle = '#20B2AA'
        ctxBack.lineWidth = 1
        ctxBack.lineJoin = 'bevel'
        ctxBack.miterLimit = 10
        ctxBack.moveTo(0, 20)
        ctxBack.lineTo(3, -145)
        ctxBack.lineTo(10, -135)
        ctxBack.lineTo(0, -180)
        ctxBack.lineTo(-10, -135)
        ctxBack.lineTo(-3, -145)
        ctxBack.lineTo(0, 20)
        ctxBack.stroke()
        ctxBack.closePath()
        ctxBack.restore()
      }
      function drawHouPin() {
        ctxBack.save()
        ctxBack.translate(250, 250)
        ctxBack.rotate(hour * 30 * Math.PI / 180)
        ctxBack.beginPath()
        ctxBack.strokeStyle = '#87CEFA'
        ctxBack.lineWidth = 1
        ctxBack.lineJoin = 'bevel'
        ctxBack.miterLimit = 10
        ctxBack.moveTo(0, 20)
        ctxBack.lineTo(3, -110)
        ctxBack.lineTo(10, -100)
        ctxBack.lineTo(0, -150)
        ctxBack.lineTo(-10, -100)
        ctxBack.lineTo(-3, -110)
        ctxBack.lineTo(0, 20)
        ctxBack.stroke()
        ctxBack.closePath()
        ctxBack.restore()
      }
      function setPoint() {
        ctxBack.beginPath()
        ctxBack.fillStyle = 'black'
        ctxBack.arc(250, 250, 3, 0, 2 * Math.PI)
        ctxBack.stroke()
      }
      function showBack() {
        for (var i = 0; i < 60; i++) {
          ctxBack.save()
          ctxBack.translate(250, 250)
          ctxBack.rotate(i / 60 * 2 * Math.PI)
          ctxBack.beginPath()
          ctxBack.strokeStyle = '#7FFFD4'
          ctxBack.moveTo(0, -250)
          ctxBack.lineWidth = i % 5 === 0 ? 5 : 2
          ctxBack.lineTo(0, -230)
          ctxBack.stroke()
          ctxBack.closePath()
          ctxBack.restore()
        }
        ctxBack.beginPath()
        ctxBack.arc(250, 250, 230, 0, 2 * Math.PI)
        ctxBack.stroke()
      }
      function degToRad(degree) {
        var result
        var factor = Math.PI / 180
        if (degree === 0) {
          result = 270 * factor
        } else {
          result = degree * factor
        }
        return result
      }
      function showTime() {
        var now = new Date()
        var today = now.toLocaleDateString()
        var time = now.toLocaleTimeString()
        var day = now.getDay()
        var hrs = now.getHours()
        var min = now.getMinutes()
        var sec = now.getSeconds()
        var mil = now.getMilliseconds()
        var smoothsec = sec + (mil / 1000)
        var smoothmin = min + (smoothsec / 60)
        var hours = hrs + (smoothmin / 60)
        milliseconds = smoothsec
        minutes = smoothmin
        hour = hours
        switch (day) {
          case 1:
            date = '一'
            break
          case 2:
            date = '二'
            break
          case 3:
            date = '三'
            break
          case 4:
            date = '四'
            break
          case 5:
            date = '五'
            break
          case 6:
            date = '六'
            break
          case 0:
            date = '日'
            break
        }
        var gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300)
        gradient.addColorStop(0, '#03303a')
        gradient.addColorStop(1, 'black')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 500, 500)
        ctx.beginPath()
        ctx.strokeStyle = '#87CEFA'
        ctx.arc(250, 250, 215, degToRad(0), degToRad((hours * 30) - 90))
        ctx.stroke()
        ctx.beginPath()
        ctx.strokeStyle = '#20B2AA'
        ctx.arc(250, 250, 220, degToRad(0), degToRad(smoothmin * 6 - 90))
        ctx.stroke()
        ctx.beginPath()
        ctx.strokeStyle = '#AFEEEE'
        ctx.arc(250, 250, 225, degToRad(0), degToRad(smoothsec * 6 - 90))
        ctx.stroke()
        ctx.font = '25px Helvetica Bold'
        ctx.fillStyle = '#7FFFD4'
        ctx.fillText(today + '/星期' + date, 150, 230)
        ctx.font = '23px Helvetica Bold'
        ctx.fillStyle = '#7FFFD4'
        ctx.fillText(time, 190, 280)
      }
      setInterval(pageInit, 50)
    },
    canvasBackground() {
      // 宇宙特效
      'use strict'
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var w = canvas.width = window.innerWidth
      var h = canvas.height = window.innerHeight

      var hue = 217
      var stars = []
      var count = 0
      var maxStars = 1300// 星星数量

      var canvas2 = document.createElement('canvas')
      var ctx2 = canvas2.getContext('2d')
      canvas2.width = 100
      canvas2.height = 100
      var half = canvas2.width / 2
      var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
      gradient2.addColorStop(0.025, '#CCC')
      gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
      gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
      gradient2.addColorStop(1, 'transparent')

      ctx2.fillStyle = gradient2
      ctx2.beginPath()
      ctx2.arc(half, half, half, 0, Math.PI * 2)
      ctx2.fill()

      // End cache

      function random(min, max) {
        if (arguments.length < 2) {
          max = min
          min = 0
        }

        if (min > max) {
          var hold = max
          max = min
          min = hold
        }

        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      function maxOrbit(x, y) {
        var max = Math.max(x, y)
        var diameter = Math.round(Math.sqrt(max * max + max * max))
        return diameter / 2
        // 星星移动范围，值越大范围越小，
      }

      var Star = function() {
        this.orbitRadius = random(maxOrbit(w, h))
        this.radius = random(60, this.orbitRadius) / 8
        // 星星大小
        this.orbitX = w / 2
        this.orbitY = h / 2
        this.timePassed = random(0, maxStars)
        this.speed = random(this.orbitRadius) / 50000
        // 星星移动速度
        this.alpha = random(2, 10) / 10

        count++
        stars[count] = this
      }

      Star.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
        var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
        var twinkle = random(10)

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05
        }

        ctx.globalAlpha = this.alpha
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
        this.timePassed += this.speed
      }

      for (var i = 0; i < maxStars; i++) {
        new Star()
      }

      function animation() {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 0.5 // 尾巴
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter'
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw()
        }

        window.requestAnimationFrame(animation)
      }

      animation()
    }
  }
}
</script>

<style lang="scss" scoped>
.yangshi {
  width: 100vw;
  height: calc(100vh - 90px);
  background: #000;
  background-size: cover;
  .can{
    margin:auto;
    width:40vw;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-250px;
    margin-top:-250px;
    opacity: 0.6;
  }
}
.openSidebar .yangshi{
  width: calc(100vw - 210px);
  transition: 0.5s;
}
.hideSidebar .yangshi{
  width: calc(100vw - 54px);
  transition: 0.5s;
}
.mobile .yangshi{
  width: calc(100vw);
  transition: 0.5s;
  // background-size: 100vw calc(100vh - 90px);
}
.luckCenter{
   width: 65vw;
  height: 65vw;
  position: absolute;
  left:0;
  top:0;
  right:0;
  bottom: 0;
  margin: auto;
}
.luck {
  width: 65vw;
  height: 65vw;
  padding-top: 1vh;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  div{
    width: 20vw;
    height: 18vw;
    margin-left: 1vw;
    text-align: center;
    line-height: 18vw;
    color: cyan;
    background: hsla(189, 100%, 84%, 0.363);
    border-radius: 10px;
    box-shadow: 0px 10px 1px hsla(189, 100%, 74%, 0.192)
  }
  .red{
    background: hsla(189, 100%, 59%, 0.219);
  }
}
@media screen and (min-width: 1100px) {
  .luckCenter{
    width: 35vw;
    height: 35vw;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    margin: auto;
  }
  .luck {
    width: 35vw;
    height: 35vw;
    padding-top: 1vh;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    div{
      width: 10vw;
      height: 9vw;
      margin-left: 1vw;
      text-align: center;
      line-height: 9vw;
      color: cyan;
      background: hsla(189, 100%, 84%, 0.363);
      border-radius: 10px;
      box-shadow: 0px 10px 1px hsla(189, 100%, 74%, 0.192)
    }
    .red{
      background: hsla(189, 100%, 59%, 0.219);
    }
  }
}
.header{
  width: 100vw;
  height: 100vh;
}
</style>
