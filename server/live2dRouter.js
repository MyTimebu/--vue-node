// 1. 加载 express 模块
const express = require('express')
// 2. 创建路有对象
const router = express.Router()

// var iconv = require('iconv-lite')
const fs = require('fs')
var name = ''
var id
router.get('/get', (req, res) => {
  console.log(req.query)
  const shuju = req.query.id.split('-')
  const shu1 = Number(shuju[0])
  const shu2 = shuju[1] ? Number(shuju[1]) : 0
  var person
  fs.readFile('./model_list.json', (err, data) => {
    if (err) {
      return console.error(err)
    }

    person = data.toString() // 将二进制的数据转换为字符串
    person = JSON.parse(person)
    var live2dDataName = person.models[shu1 - 1]

    if (Array.isArray(live2dDataName)) {
      live2dDataName = shu2 > 0 ? live2dDataName[Number(shu2) - 1] : live2dDataName[0]
      if (live2dDataName === undefined) {
        live2dDataName = person.models[shu1 - 1][0]
      }
    }
    var live2dData
    fs.readFile('./model/' + live2dDataName + '/index.json', (err, data) => {
      name = './model/' + live2dDataName
      // console.log(name)
      if (err) {
        return console.error(err)
      }
      live2dData = data.toString() // 将二进制的数据转换为字符串
      live2dData = JSON.parse(live2dData)
      var tupiuan2 = ''
      var person2
      if (shu2 > 0) {
        if (fsExistsSync('./model/' + live2dDataName + '/textures.cache')) {
          fs.readFile('./model/' + live2dDataName + '/textures.cache', (err, data) => {
            if (err) {
              return console.error(err)
            }
            person2 = data.toString() // 将二进制的数据转换为字符串
            person2 = JSON.parse(person2)
            if (person2 !== null) {
              if (Array.isArray(person2[shu2 - 1])) {
                tupiuan2 = person2[shu2 - 1].flat(Infinity)
                // console.log(tupiuan2)
              } else {
                tupiuan2 = [person2[shu2 - 1]]
              }

              live2dData.textures = tupiuan2
              const status = live2dData
              return res.json(status)
            } else {
              const status = live2dData
              return res.json(status)
            }
          })
        } else {
          console.log()
        }
      } else {
        const status = live2dData
        return res.json(status)
      }
    })
  })
})

router.get('/get/model.moc', (req, res) => {
  // console.log(req.path)
  const shuju = req.path.split('/')
  const shu1 = shuju[2]
  // const shu2 = shuju[1] ? shuju[1] : 0
  // var person
  fs.readFile(name + '/' + shu1, (err, data) => {
    if (err) {
      return console.error(err)
    }
    // console.log(iconv.decode(data, 'UCS-2BE'))
    // person = data.toString() // 将二进制的数据转换为字符串
    // person = JSON.parse(person)
    // const status = person
    // console.log(status)
    // res.json(status)
    return res.end(Buffer.from(data, 'UCS-2BE'))
  })
})

router.get('/get/expressions/*', (req, res) => {
  // console.log(req.path)
  const shuju = req.path.split('get')
  const shu1 = shuju[1]
  // const shu2 = shuju[1] ? shuju[1] : 0
  var person
  fs.readFile(name + shu1, (err, data) => {
    if (err) {
      return console.error(err)
    }
    // console.log(iconv.decode(data, 'UCS-2BE'))
    person = data.toString() // 将二进制的数据转换为字符串
    person = JSON.parse(person)
    const status = person
    return res.json(status)
  })
})

router.get('/get/*.json', (req, res) => {
  // console.log(req.path)
  const shuju = req.path.split('get')
  const shu1 = shuju[1]
  // const shu2 = shuju[1] ? shuju[1] : 0
  var person

  fs.readFile(name + shu1, (err, data) => {
    if (err) {
      return console.error(err)
    }
    // console.log(iconv.decode(data, 'UCS-2BE'))
    person = data.toString() // 将二进制的数据转换为字符串
    person = JSON.parse(person)
    const status = person
    return res.json(status)
  })
})

router.get('/get/textures/*', (req, res) => {
  // console.log(req.query)
  const shuju = req.path.split('get')
  const shu1 = shuju[1]
  // const shu2 = shuju[1] ? shuju[1] : 0
  // var person
  // console.log(shu1)
  fs.readFile(name + shu1, (err, data) => {
    if (err) {
      return console.error(err)
    }

    // person = data.toString() // 将二进制的数据转换为字符串
    // console.log(person)
    // person = JSON.parse(person)
    // console.log(person)
    // const status = person
    // res.json(status)Buffer.from
    return res.end(Buffer.from(data, 'binary'))
  })
})

router.get('/get/textures.:id/*', (req, res) => {
  // console.log(req.query)
  const shuju = req.path.split('get')
  var shu1
  if (shuju[1].split(',').length > 1) {
    shu1 = shuju[1].split(',')
    shu1.forEach(item => {
      // console.log(name + item)
      fs.readFile(name + item, (err, data) => {
        if (err) {
          return console.error(err)
        }

        // person = data.toString() // 将二进制的数据转换为字符串
        // person = JSON.parse(person)
        // console.log(person)
        // const status = person
        // res.json(status)
        return res.end(Buffer.from(data, 'binary'))
      })
    })
  } else {
    shu1 = shuju[1]
  }
  // const shu2 = shuju[1] ? shuju[1] : 0
  // var person
  // console.log(shu1)
  fs.readFile(name + shu1, (err, data) => {
    if (err) {
      return console.error(err)
    }

    // person = data.toString() // 将二进制的数据转换为字符串
    // console.log(person)
    // person = JSON.parse(person)
    // console.log(person)
    // const status = person
    // res.json(status)
    return res.end(Buffer.from(data, 'binary'))
  })
})

router.get('/get/texture_:id/*', (req, res) => {
  // console.log(req.query)
  const shuju = req.path.split('get')
  var shu1
  if (shuju[1].split(',').length > 1) {
    shu1 = shuju[1].split(',')
    shu1.forEach(item => {
      fs.readFile(name + item, (err, data) => {
        if (err) {
          return console.error(err)
        }

        // person = data.toString() // 将二进制的数据转换为字符串
        // person = JSON.parse(person)
        // console.log(person)
        // const status = person
        // res.json(status)
        return res.end(Buffer.from(data, 'binary'))
      })
    })
  } else {
    shu1 = shuju[1]
  }
  // const shu2 = shuju[1] ? shuju[1] : 0
  // var person
  // console.log(shu1)
  fs.readFile(name + shu1, (err, data) => {
    if (err) {
      return console.error(err)
    }

    // person = data.toString() // 将二进制的数据转换为字符串
    // person = JSON.parse(person)
    // console.log(person)
    // const status = person
    // res.json(status)
    return res.end(Buffer.from(data, 'binary'))
  })
})

router.get('/get/motions/*', (req, res) => {
  // console.log(req.query)
  const shuju = req.path.split('get')
  const shu1 = shuju[1]
  // const shu2 = shuju[1] ? shuju[1] : 0
  // var person
  fs.readFile(name + decodeURIComponent(shu1), (err, data) => {
    if (err) {
      return console.error(err)
    }

    // person = data // 将二进制的数据转换为字符串
    // person = JSON.parse(person)
    // console.log(person)
    // const status = person
    // res.json(status)
    return res.end(Buffer.from(data, 'UCS-2BE'))
    // res.end(new Buffer.from(data, 'binary'))
  })
})

router.get('/rand_textures', (req, res) => {
  var id1 = req.query.id.split('-')[0]
  id = req.query.id.split('-')[1]

  var person2
  if (Number(id) === 0) {
    id = 1
  }
  var live2dData
  var person

  if (fsExistsSync(name + '/textures.cache')) {
    fs.readFile(name + '/textures.cache', (err, data) => {
      if (err) {
        return console.error(err)
      }
      person2 = data.toString() // 将二进制的数据转换为字符串
      person2 = JSON.parse(person2)

      if (person2 == null) {
        fs.readFile('./model_list.json', (err, data) => {
          if (err) {
            return console.error(err)
          }

          person = data.toString() // 将二进制的数据转换为字符串
          person = JSON.parse(person)
          if (Array.isArray(person.models[id1 - 1])) {
            const status = { textures: { id: Number(sum(person.models[id1 - 1].length + 1)) }}
            return res.json(status)
          } else {
            fs.readFile(name + '/index.json', (err, data) => {
              if (err) {
                return console.error(err)
              }
              live2dData = data.toString() // 将二进制的数据转换为字符串
              live2dData = JSON.parse(live2dData)

              if (Array.isArray(live2dData.textures)) {
                if (live2dData.textures.length <= 1) {
                  const status = { textures: { id: 1 }}
                  return res.json(status)
                } else {
                  console.log(live2dData.textures.length)
                  const status = { textures: { id: Number(sum(live2dData.textures.length + 1)) }}
                  return res.json(status)
                }
              }
            })
          }
        })

        // var shuzhi = sum(0, id + 1)
        // const status = { textures: { id: Math.abs(shuzhi) }}
        // return res.json(status)
      } else {
        const status = { textures: { id: sum(person2.length) }}
        return res.json(status)
      }
    })
  } else {
    fs.readFile('./model_list.json', (err, data) => {
      if (err) {
        return console.error(err)
      }

      person = data.toString() // 将二进制的数据转换为字符串
      person = JSON.parse(person)
      if (Array.isArray(person.models[id1 - 1])) {
        const status = { textures: { id: Number(sum(person.models[id1 - 1].length + 1)) }}
        return res.json(status)
      } else {
        fs.readFile(name + '/index.json', (err, data) => {
          if (err) {
            return console.error(err)
          }
          live2dData = data.toString() // 将二进制的数据转换为字符串
          live2dData = JSON.parse(live2dData)

          if (Array.isArray(live2dData.textures)) {
            if (live2dData.textures.length <= 1) {
              const status = { textures: { id: 1 }}
              return res.json(status)
            } else {
              console.log(live2dData.textures.length)
              const status = { textures: { id: Number(sum(live2dData.textures.length + 1)) }}
              return res.json(status)
            }
          }
        })
      }
    })
  }
})

router.get('/switch', (req, res) => {
  console.log(req.query)
  id = req.query.id.split('-')[0]
  var status
  if (Number(id) >= 7) {
    status = { model: { id: 1 }}
  } else {
    status = { model: { id: Number(id) + 1 }}
  }
  res.json(status)
})
router.get('/nepnep/general/exp/*.json', (req, res) => {
  // console.log(req.path)
  const Path = name.split('neptune_classic')
  var person
  console.log(Path)
  fs.readFile(Path[0] + req.path, (err, data) => {
    if (err) {
      return console.error(err)
    }
    person = data.toString() // 将二进制的数据转换为字符串
    person = JSON.parse(person)
    const status = person
    return res.json(status)
  })
})
router.get('/general/pose.json', (req, res) => {
  // console.log(req.path)
  const Path = name.split('neptune_classic')
  var person
  console.log(Path)
  fs.readFile(Path[0] + req.path, (err, data) => {
    if (err) {
      return console.error(err)
    }
    person = data.toString() // 将二进制的数据转换为字符串
    person = JSON.parse(person)
    const status = person
    return res.json(status)
  })
})
router.get('/nepnep/general/mtn/*.mtn', (req, res) => {
  // console.log(req.path)
  const Path = name.split('neptune_classic')
  // var person
  console.log(Path)
  fs.readFile(Path[0] + req.path, (err, data) => {
    if (err) {
      return console.error(err)
    }
    // person = data.toString() // 将二进制的数据转换为字符串
    // person = JSON.parse(person)
    // const status = person
    return res.end(Buffer.from(data, 'binary'))
  })
})
// 检测文件是否存在
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}
// 随机正整数
function sum(n) {
  var num = Math.floor(Math.random() * n)
  console.log(Number(num) === Number(id), Number(num), Number(id))
  if (Number(num) === Number(id)) {
    return Number(num) + 1
  }
  return num
}
// 4. 导出router对象
module.exports = router
