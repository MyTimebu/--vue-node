// 1. 加载 express 模块
const express = require('express')
// 2. 创建路有对象
const router = express.Router()

var fs = require('fs')

router.post('/flac/audio/list', (req, res) => {
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
  })
})

router.post('/flac/audio/play', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })

  var person
  fs.readFile('./audio/nav_json/navMusic.json', (err, data) => {
    if (err) {
      return console.error(err)
    }
    alldata = JSON.parse(alldata.toString())
    person = JSON.parse(data.toString())

    // if (alldata === {}) {
    // const status = { code: 20000, message: '上一次记录', data: person.music }
    // res.json(status)
    console.log(person.music)
    fs.readFile(`./audio/flac/${person.music}.flac`, (err, data) => {
      if (err) {
        return console.error(err)
      }
      const status = { code: 20000, message: '更改成功', data: 'data:audio/wav;base64,' + data.toString('base64') }
      res.json(status)
      // res.end('data:audio/wav;base64,' + data.toString('base64'))
    })
    return
    // }
    // 将二进制的数据转换为字符串在专为json数组
    // person.music = alldata.name
    // // person.data[alldata.inde].address = alldata.address
    // var str = JSON.stringify(person) // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    // fs.writeFile('./nav_json/navMusic.json', str, function(err) {
    //   if (err) {
    //     console.error(err)
    //     const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
    //     res.json(status)
    //     return
    //   }
    //   const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
    //   res.json(status)
    //   return
    // })
    // fs.readFile(`./flac/${alldata.name}.flac`, (err, data) => {
    //   if (err) {
    //     return console.error(err)
    //   }
    //   // const status = { code: 20000, message: '更改成功', data: data }
    //   // res.json(status)
    //   res.end('data:audio/wav;base64,' + data.toString('base64'))
    // })
  })
})

// 4. 导出router对象
module.exports = router
