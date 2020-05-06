// 1. 加载 express 模块
const express = require('express')
// 2. 创建路有对象
const router = express.Router()
const fs = require('fs')

router.post('/RecordingBoard/list', (req, res) => {
  var person
  fs.readFile('./json/RecordingBoard.json', (err, data) => {
    if (err) {
      return console.error(err)
    }
    console.log(data)

    person = data.toString() // 将二进制的数据转换为字符串
    person = JSON.parse(person)
    const status = { code: 20000, message: '一切正常', data: person }
    res.json(status)
  })
})
// 改
router.post('/RecordingBoard/edit', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })
  var person
  fs.readFile('../json/RecordingBoard.json', (err, data) => {
    if (err) {
      return console.error(err)
    }
    alldata = JSON.parse(alldata.toString())
    person = JSON.parse(data.toString())
    // 将二进制的数据转换为字符串在专为json数组
    console.log(alldata)
    person.data[alldata.inde].name = alldata.name
    person.data[alldata.inde].address = alldata.address
    var str = JSON.stringify(person) // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('../json/RecordingBoard.json', str, function(err) {
      if (err) {
        console.error(err)
        const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
        res.json(status)
        return
      }
      const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
      res.json(status)
      return
    })
    const status = { code: 20000, message: '更改成功', data: '' }
    res.json(status)
  })
})
// 删
router.post('/RecordingBoard/delete', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })
  var person
  fs.readFile('./json/RecordingBoard.json', (err, data) => {
    if (err) {
      return console.error(err)
    }
    alldata = JSON.parse(alldata.toString())
    person = JSON.parse(data.toString())
    // 将二进制的数据转换为字符串在专为json数组
    person.Alldata.splice(Number(alldata.id), 1)
    person.Selection.forEach((item, index) => {
      if (Number(item.id) === Number(alldata.id)) {
        person.Selection.splice(index, 1)
      }
    })
    person.total = person.Alldata.length
    var str = JSON.stringify(person) // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./json/RecordingBoard.json', str, function(err) {
      if (err) {
        console.error(err)
        const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
        res.json(status)
        return
      }
      const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
      res.json(status)
      return
    })
    const status = { code: 20000, message: '删除成功', data: '' }
    res.json(status)
  })
})
// 增
router.post('/RecordingBoard/Add', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })
  var person
  fs.readFile('./json/RecordingBoard.json', (err, data) => {
    if (err) {
      return console.error(err)
    }
    alldata = JSON.parse(alldata.toString())
    person = JSON.parse(data.toString())
    // 将二进制的数据转换为字符串在专为json数组
    person.Alldata.push({ id: person.Alldata.length, content: alldata.content })
    person.total = person.Alldata.length
    var str = JSON.stringify(person) // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./json/RecordingBoard.json', str, function(err) {
      if (err) {
        console.error(err)
        const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
        res.json(status)
        return
      }
      const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
      res.json(status)
      return
    })
    const status = { code: 20000, message: '增加成功', data: '' }
    res.json(status)
  })
})
// 增加选中
router.post('/RecordingBoard/SelectionAdd', (req, res) => {
  var alldata = ''
  req.on('data', function(chunk) {
    alldata += chunk
  })
  var person
  fs.readFile('./json/RecordingBoard.json', (err, data) => {
    if (err) {
      return console.error(err)
    }
    alldata = JSON.parse(alldata.toString())
    person = JSON.parse(data.toString())
    // 将二进制的数据转换为字符串在专为json数组
    person.Selection = alldata.content
    // person.total = person.Alldata.length
    var str = JSON.stringify(person) // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./json/RecordingBoard.json', str, function(err) {
      if (err) {
        console.error(err)
        const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
        res.json(status)
        return
      }
      const status = { code: -10000, message: '更改失败，原因' + err, data: '' }
      res.json(status)
      return
    })
    const status = { code: 20000, message: '增加成功', data: '' }
    res.json(status)
  })
})
module.exports = router
