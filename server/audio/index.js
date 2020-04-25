/**
* tex	  String	合成的文本，使用UTF-8编码，请注意文本长度必须小于1024字节	是
  cuid	String	用户唯一标识，用来区分用户，填写机器 MAC 地址或 IMEI 码，长度为60以内	否
  spd	  String	语速，取值0-9，默认为5中语速	否
  pit	  String	音调，取值0-9，默认为5中语调	否
  vol	  String	音量，取值0-15，默认为5中音量	否
  per	  String	发音人选择
  0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女	否
*/

// 1. 加载 express 模块
const express = require('express')
// 2. 创建路有对象
const router = express.Router()

var AipSpeechClient = require('baidu-aip-sdk').speech

// 设置APPID/AK/SK
var APP_ID = '19599656'
var API_KEY = '04s2xVjZHDidSfYIQjlZruGS'
var SECRET_KEY = 'mZD47QuBvCGlUGLepqF2ZNTs9HURpKyo'

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)

// 语音合成
var fs = require('fs')

// client.text2audio('百度语音合成测试').then(function(result) {
//   if (result.data) {
//     fs.writeFileSync('tts.mpVoice.mp3', result.data)
//   } else {
//     // 服务发生错误
//     console.log(result)
//   }
// }, function(e) {
//   // 发生网络错误
//   console.log(e)
// })

// 语音合成, 附带可选参数

router.post('/audio/text', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })

  req.on('end', function() {
    // 将字符串转换位一个对象
    var dataString = alldata.toString()
    // console.log(JSON.parse(dataString))
    const data = JSON.parse(dataString)
    // 将接收到的字符串转换位为json对象
    console.log(data)
    client.text2audio(data.Text, { spd: 2, per: 3 }).then(function(result) {
      if (result.data) {
        // const status = { code: 20000, message: '一切正常', data: Buffer.from(result.data, 'mp3') }
        return res.end('data:audio/wav;base64,' + result.data.toString('base64'))
        // res.json(status)
        // fs.writeFileSync('tts.mpVoice.mp3', result.data)
      } else {
        // 服务发生错误
        console.log(result)
      }
    }, function(e) {
      // 发生网络错误
      console.log(e)
    })
    // var dataObj = querystring.parse(dataString)
    // // 输出数据
    // console.log(dataObj)
  })
})
// client.text2audio('百度语音合成测试', { spd: 0, per: 4 }).then(function(result) {
//   if (result.data) {
//     fs.writeFileSync('tts.mpVoice.mp3', result.data)
//   } else {
//     // 服务发生错误
//     console.log(result)
//   }
// }, function(e) {
//   // 发生网络错误
//   console.log(e)
// })

// 4. 导出router对象
module.exports = router
