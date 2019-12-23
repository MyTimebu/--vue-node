<template>
  <div class="menus">
    <div class="menu_circular Three_dimensional">
      <div v-for="(item,index) in i" v-if="!item.hidden" :key="index" :class="ine===index?'circular active':'circular'" @click="position(index,item)">
        <div class="InnerCircle">
          <svg-icon class="InnerCircleSvg" :icon-class="item.meta ? item.meta.icon : item.children[0].meta.icon" />
        </div>
      </div>
    </div>
    <div v-show="DisplayHiding" ref="menu_menu" class="menu_menu">
      <div class="menu_box">
        <div v-for="(item,index) in children" :key="index" :class="inde === index?'menu_Line actives':'menu_Line'" @click="Jump(item,index)">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta ? item.meta.icon : item.children[0].meta.icon" />
          {{ item.meta.title }}
        </div>
      </div>
    </div>
    <div v-show="DisplayHiding2" class="menu_menus">
      <div class="menu_box">
        <div v-for="(item,index) in children2" :key="index" class="menu_Line" @click="Jump(item)">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta ? item.meta.icon : item.children[0].meta.icon" />
          {{ item.meta.title }}
        </div>
      </div>
    </div>
    <div class="menu" @touchmove.prevent />
  </div>
</template>

<script>
export default {
  name: 'Menus',
  components: {},
  data() {
    return {
      i: this.$router.options.routes,
      ine: '',
      inde: '',
      children: [],
      DisplayHiding: false,
      DisplayHiding2: false,
      children2: [],
      shu: 1,
      itemShu: ''
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  created() {
    console.log(this.$router.options.routes)
  },
  mounted() {
    var div = document.querySelector('.menu_circular')
    div.addEventListener('scroll', () => {
      this.DisplayHiding = false
      this.DisplayHiding2 = false
      this.ine = ''
      this.inde = ''
      var divs = document.querySelector('.menu_menus')
      divs.style.color = `''`
      divs.style.textShadow = `''`
    })
    var divs = document.querySelector('.menu_menu')
    divs.addEventListener('scroll', () => {
      this.DisplayHiding2 = false
    })
  },
  methods: {
    position(i, children, event) {
      this.ine = i
      this.children = children.children
      this.DisplayHiding = true
      var e = event || window.event
      var div = document.querySelector('.menu_menu')
      div.style.top = `${e.clientY - 42}px`
      this.DisplayHiding2 = false
      this.itemShu = children
    },
    Jump(item, index) {
      var divs = document.querySelector('.menu_menus')
      if (index !== undefined && index !== null && index !== '') {
        this.inde = index
        divs.style.color = `''`
        divs.style.textShadow = `''`
      }
      if (!item.children) {
        this.$router.push({ path: `${this.itemShu.path}` })
        console.log(item)
      } else {
        this.children2 = item.children
        this.DisplayHiding2 = true
        var menu = document.querySelector('.menu_circular')
        menu.style.left = '-72vw'
        var div = document.querySelector('.menu_menu')
        div.style.left = '25vw'
        var e = event || window.event
        // var divs = document.querySelector('.menu_menus')
        divs.style.top = `${e.clientY - 38}px`
        divs.style.left = '60vw'

        if (this.shu === 2) {
          divs.style.color = `hsla(108, 100%, 50%, 0.61) !important;`
          divs.style.textShadow = `0px 1px 3px rgb(200, 255, 0)`
        }
        this.shu++
        this.shu = this.shu > 3 ? 3 : this.shu
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
}
.menus{
  width: 100vw;
  height: 100vh;
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
.menu_circular{
  width: 11vw;
  height: 30vh;
  display: block;
  overflow: hidden;
  position: absolute;
  transition: 0.5s;
  left:0;
  top:0;
  right: 0;
  bottom: 0;
  margin:auto;
  overflow-y: auto;
  text-align: center;
  border-radius: 5vw 5vw 5vw 5vw;
  &::-webkit-scrollbar {display:none}
  .circular{
    width: 10vw;
    height: 10vw;
    display: inline-block;
    margin-top: 0.1vw;
    border-radius: 50%;
    position: relative;
    border: 0.3vw #fff solid;
    box-shadow: 0px 0px 2vw #91919150;
    animation: myfirst5 3s;
    .InnerCircle{
      width: 7.5vw;
      height: 7.5vw;
      line-height: 7.5vw;
      font-size: 4vw;
      text-align: center;
      color: #94d8ff;
      background: rgba(255, 255, 255, 0.356);
      border-radius: 50%;
      position: absolute;
      left:0;
      top:0;
      right: 0;
      bottom: 0;
      margin:auto;
      .InnerCircleSvg{
        // width: 5vw
      }
    }
  }
  .circular:nth-of-type(1){
    animation: myfirst 2s;
  }
  .circular:nth-of-type(2){
    animation: myfirst1 2s;
  }
  .circular:nth-of-type(3){
    animation: myfirst2 2s;
  }
  .circular:nth-of-type(4){
    animation: myfirst3 2s;
  }
  .circular:nth-of-type(5){
    animation: myfirst4 2s;
  }
}
@keyframes myfirst
{
  from {
    transform: rotateX(110deg);
    opacity: 0;
    position: absolute;
    top: 0;
  }
  to {
    transform: rotateX(10deg);
    opacity: 1;
    position: absolute;
    top:  0.5vw;
  }
}
@keyframes myfirst1
{
  from {
    transform: rotateX(110deg);
    opacity: 0;
    position: absolute;
    top: 0;
  }
  to {
    transform: rotateX(10deg);
    opacity: 1;
    position: absolute;
    top: 12.1vw;
  }
}
@keyframes myfirst2
{
  from {
    transform: rotateX(110deg);
    opacity: 0;
    position: absolute;
    top: 0;
  }
  to {
    transform: rotateX(10deg);
    opacity: 1;
    position: absolute;
    top: 24.1vw;
  }
}
@keyframes myfirst3
{
  from {
    transform: rotateX(110deg);
    opacity: 0;
    position: absolute;
    top: 0;
  }
  to {
    transform: rotateX(10deg);
    opacity: 1;
    position: absolute;
    top: 37vw;
  }
}
@keyframes myfirst4
{
  from {
    transform: rotateX(110deg);
    opacity: 0;
    position: absolute;
    top: 0;
  }
  to {
    transform: rotateX(10deg);
    opacity: 1;
    position: absolute;
    top: 47.8vw;
  }
}
@keyframes myfirst5
{
  from {
    opacity: 0;
  }
  to {
    opacity: 0;
  }
}

.menu_menu{
  width: 0.5vw;
  height: 25vw;
  transform: rotateX(10deg) rotateY(8deg);
  background: #fff;
  position: absolute;
  line-height: 25vw;
  left: 55vw;
  top:0;
  border-radius: 5% 5% 5% 5%;
  transition: 1s;
  // right: -23vw;
  // bottom: 0;
  margin:auto;
  &::before{
    content: ' ';
    display: inline-block;
    margin-left: -5.7vw;
    width: 0;
    height: 0;
    border: 2.5vw solid;
    border-color: transparent #ffffff transparent transparent;
  }
  &::after{
    content: ' ';
    display: inline-block;
    position: absolute;
    top: 10.68vw;
    left: -2.3vw;
    width: 1.2vw;
    height: 1.2vw;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
  }
  .menu_Line{
    width: 30vw;
    height: 7vw;
    background: rgba(206, 206, 206, 0.6);
    margin-left: 1.3vw;
    margin-bottom: 1vw;
    line-height: 7vw;
    color: #fff;
    padding-left: 0.8vw;
    box-sizing: border-box;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
    // position: absolute;
    // top: 1vw;
  }
  .menu_box{
    width: 31vw;
    height: 25vw;
    position: absolute;
    top: 1vw;
    overflow: hidden;
    overflow-y: auto;
  }
  .menu_Line:nth-of-type(2){
    // top: 9vw;
  }
  .menu_Line:nth-of-type(3){
    // top: 17vw;
  }
}
@media screen and (min-width: 600px) {
  .menu_menu{
    &::after{
      top: 10.1vw;
    }
  }
}
@media screen and (max-width: 400px) {
  .menu_menu{
    &::after{
      top: 10.9vw;
    }
  }
}
.menu_menus{
  @extend .menu_menu;
  transform: rotateX(8deg) rotateY(-5deg);
}
.Three_dimensional{
  left: -10vw;
  transform: rotateX(8deg) rotateY(-5deg);
}
.active{
  border-color: #ffa600 !important;
  >.InnerCircle{
    color: #ffa600 !important;
    background: hsla(39, 100%, 50%, 0.137) !important;
  }
}
.actives{
  box-shadow: 0px 0px 5px #ffa600;
  color: hsla(108, 100%, 50%, 0.61) !important;
  text-shadow: 0px 1px 3px rgb(200, 255, 0);
}
</style>
