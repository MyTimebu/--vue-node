<template>
  <div>
    <vueCanvasPoster :painting="painting " @success="success"></vueCanvasPoster>
     <img :src="src">
     <div>_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-</div>
  </div>
</template>

<script>
import {vueCanvasPoster} from "vue-canvas-poster";
export default {
  components: {
    vueCanvasPoster
  },
  data() {
    return  {
      painting:{
        width: 560,
        height: 785,
        views: [
          {
            type: 'rect',
            top: 0,
            left: 0,
            background: 'transparent',
            width: 560,
            height: 785,
            radius: 20
          },
          {
            type: 'image',
            url: require('../../assets/images/pupop.png'),
            left: 0,
            top: 0,
            width: 560,
            height: 785,
            radius: 20
          },
          {
            type: 'image',
            url: require('../../assets/images/pupop_border.png'),
            left: 30,
            top: 50,
            width: 492,
            height: 700,
            radius: 20
          },
          {
            type: 'text',
            left: 220,
            top: 150,
            content: `当面扫码立即付款`,
            textAlign: 'left',
            color:'#666'
          },
          {
            type: 'text',
            left: 230,
            top: 270,
            content: `二维码付款`,
            textAlign: 'left',
            color:'#eb7856'
          },
          // {
          //   type: 'rect',
          //   top: 90,
          //   left:10,
          //   background: '#f4f5f7',
          //   width: 100,
          //   height: 150
          // },
          {
            type: 'qrcode',
            content: 'https://github.com/sunnie1992/vue_canvas_poster',
            left: 180,
            top: 350,
            background: '#fff',
            color:'#fd7038',
            width: 200,
            height: 200
          }
        ],
      },
      paintings:{
        width: 550,
        height: 876,
        views: [
          {
            type: 'rect',
            top: 0,
            left: 0,
            background: '#f4f5f7',
            width: 550,
            height: 876
          },
          {
            type: 'image',
            url: 'https://avatars0.githubusercontent.com/u/35954879?s=460&v=4',
            left: 36,
            top: 20,
            width: 80,
            height: 80,
            radius: 40
          },
          {
            type: 'text',
            content: '乖摸摸头的小店',
            fontSize: 26,
            bolder: true,
            top: 48,
            left: 136,
            width: 360,
            breakWord: true,
            MaxLineNumber: 1,
          },
          {
            type: 'rect',
            top: 120,
            left: 12,
            background: '#FFFFFF',
            width: 526,
            height: 540,
            radius: 10
          },
          // 本地图片
          {
            type: 'image',
            url: require('../../assets/images/2.jpg'),
            left: 25,
            top: 150,
            width: 332,
            height: 332,
          },
          // 网络图片
          {
            type: 'image',
            url: 'https://tgoods.top1buyer.com/res/testfile/imgs/20190702180744/MR9600-Pink/2.jpg',
            left: 364,
            top: 150,
            width: 160,
            height: 160
          },
          {
            type: 'image',
            url: 'https://tgoods.top1buyer.com/res/testfile/imgs/20190702180744/MR9600-Pink/3.jpg',
            left: 364,
            top: 320,
            width: 160,
            height: 160
          },
          {
            type: 'text',
            content: `18987、安奈儿童装上衣条纹童装上衣条纹童装上衣 条纹童装上衣`,
            color: '#666666',
            fontSize: 22,
            top: 507,
            left: 25,
            width: 450,
            lineHeight: 33,
            MaxLineNumber: 2,
            breakWord: true
          },

          {
            type: 'text',
            content: `劲爆价:`,
            fontSize: 24,
            top: 608,
            left: 26,
          },
          {
            type: 'text',
            content: `¥39.00`,
            color: '#E5463E',
            fontSize: 36,
            border: true,
            top: 601,
            left: 116
          },
          {
            type: 'text',
            content: `¥259.00`,
            color: '#999999',
            fontSize: 26,
            border: true,
            top: 609,
            left: 243,
            textDecoration: 'line-through'
          },
          {
            type: 'rect',
            top: 647,
            left: 439,
            background: '#fff',
            width: 28,
            height: 28,
            deg: 45
          },
          {
            type: 'text',
            content: `长按或扫描二维码`,
            fontSize: 18,
            color: '#999999',
            top: 829,
            left: 385
          },
          // 本地图片
          {
            type: 'image',
            url: require('../../assets/images/3.jpg'),
            left: 26,
            top: 821,
            width: 218,
            height: 24
          },
          {
            type: 'qrcode',
            content: 'https://github.com/sunnie1992/vue_canvas_poster',
            background: '#fff',
            color: '#000',
            left: 392,
            top: 690,
            width: 130,
            height: 130
          },
        ]
      },
      src:'',
      time:''
    }
  },
  created(){},
  methods: {
    success(src) {
      // 设置img的src
      this.src = src
      console.log(this.src)
    }
  },
  fail(err) {
    console.log('fail', err)
  } 
}
</script>

<style lang="scss" scoped></style>
