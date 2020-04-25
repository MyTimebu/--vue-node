<template>
  <div class="yangshi">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;border-radius: 10px 10px 0 0"
    >

      <el-table-column v-if="lie1" label="ID" prop="id" />
      <el-table-column label="前一句" prop="name" />
      <el-table-column label="后一句" prop="address" />
      <el-table-column label="朗读当前">
        <template slot-scope="{row}">
          <i class="el-icon-mic" @click="PlayCurrent(row)" />
        </template>
      </el-table-column>
      <el-table-column v-if="lie2" align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="medium" @click="TableAdd">添加</el-button>
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="TableEdit(Number(scope.row.id-1), scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(Number(scope.row.id-1), scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <div id="AudioText" />
      <el-pagination
        :small="fen"
        :current-page.sync="page"
        :page-size="10"
        :layout="layouts"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { async } from 'q'
export default {
  data() {
    return {
      tableData: [],
      search: '',
      key: 1,
      key2: 1,
      page: 1,
      total: 0,
      lie1: true,
      lie2: true,
      fen: false,
      layouts: 'prev, pager, next, jumper'
    }
  },
  created() {
    this.TableList()
    const w = window.innerWidth
    if (Number(w) < 1000) {
      this.lie1 = false
      this.fen = true
      this.layouts = 'prev, pager, next'
    }
    if (Number(w) < 600) {
      this.lie1 = false
      this.lie2 = false
      this.fen = true
      this.layouts = 'prev, pager, next'
    }
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.TableList()
    },
    // 增
    TableAdd() {
      let name = ''
      let address = ''
      const h = this.$createElement
      this.key = this.key + this.key2
      this.key2 = this.key + this.key2
      // console.log(this.key, this.key2)
      this.$msgbox({
        title: '更改',
        message: h('div', null, [
          h('span', null, '名字： '),
          h('input', {
            key: this.key,
            class: 'input_mag',
            attrs: { value: name, id: 'hinput' },
            on: {
              input: function(event) {
                name = event.target.value
              }
            }
          }),
          h('br'),
          h('br'),
          h('span', null, '地址： '),
          h('input', {
            key: this.key2,
            class: 'input_mag',
            attrs: { value: address, id: 'hinput2' },
            on: {
              input: function(event) {
                address = event.target.value
              }
            }
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }
      }).then(async(action) => {
        const data = {
          name,
          address
        }
        const edit = await this.request({
          url: '/table/Add',
          method: 'post',
          data
        })
        this.$message({
          type: 'info',
          message: edit.message
        })
        this.TableList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 语音播放
    async PlayCurrent(row) {
      const qian = row.name.match(/\((.+?)\)/g)
      const hou = row.address.match(/\((.+?)\)/g)
      const TextCont = qian + ' ' + hou
      // console.log(TextCont, qian, hou)
      await this.request({
        url: '/audio/text',
        method: 'post',
        data: { Text: TextCont }
      }).then((res) => {
        document.getElementById('AudioText').innerHTML = `<audio controls="controls" controlsList="nodownload" autoplay style='display:none'><source src="${res}" type="audio/mp3"></audio>`
        console.log(res)
      })
    },
    // 删
    async handleDelete(index, row) {
      const data = {
        inde: index
      }
      // const del = await this.request({
      //   url: '/table/delete',
      //   method: 'post',
      //   data
      // })
      this.$message({
        type: 'info',
        message: '不许删除'
      })
      this.TableList()
    },
    // 查
    async TableList() {
      const data = {
        page: this.page
      }
      const list = await this.request({
        url: '/table/list',
        method: 'post',
        data
      })
      // console.log(list)
      const { data: tableDatas } = list
      this.tableData = tableDatas.data
      this.total = tableDatas.total
    },
    // 改
    async TableEdit(index, row) {
      console.log(index, row)
      const inde = index
      let name = row.name
      let address = row.address
      this.key = this.key + this.key2
      this.key2 = this.key + this.key2
      console.log(this.key, this.key2)
      const h = this.$createElement
      this.$msgbox({
        title: '更改',
        message: h('div', null, [
          h('span', null, '名字： '),
          h('input', {
            key: this.key,
            class: 'input_mag',
            attrs: { value: name, id: 'hinput' },
            on: {
              input: function(event) {
                name = event.target.value
              }
            }
          }),
          h('br'),
          h('br'),
          h('span', null, '地址： '),
          h('input', {
            key: this.key2,
            class: 'input_mag',
            attrs: { value: address, id: 'hinput2' },
            on: {
              input: function(event) {
                address = event.target.value
              }
            }
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          // console.log(action, instance, done)
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }
      }).then(async(action) => {
        // console.log(name,address)
        const data = {
          name,
          inde,
          address
        }
        const edit = await this.request({
          url: '/table/edit',
          method: 'post',
          data
        })
        this.$message({
          type: 'info',
          message: edit.message
        })
        this.TableList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

// @media screen and (max-width: 1000px) {
//   /deep/{
//     .el-table_1_column_1{
//       width: 1px !important;
//       overflow: hidden;
//       padding: 0;
//       box-sizing: border-box;
//       >.cell{
//         width: 1px !important;
//       overflow: hidden;
//       padding: 0;
//       box-sizing: border-box;
//       }
//     }
//   }
// }
// @media screen and (max-width: 450px) {
//   /deep/.el-table_1_column_4{
//     display: none
//   }
// }
.yangshi{
  border-radius: 10px;
  box-shadow:  1px 1px 1px #f4f5f7;
  // position: relative;
}
.input_mag{
  width: 200px;
  height: 30px;
  padding-left:5px;
  box-sizing: border-box;
  background: none;
  outline: none;
  border: 1px solid #E4E7ED;
  border-radius: 5px;
  box-sizing: border-box;
}
.input_mag:hover{
  border: 1px solid #C0C4CC;
}
.input_mag:focus {
  border: none;
  box-shadow: 0px 0px 2px #1ab4f1;
}
.block {
  background: #fff;
  border-radius: 0 0 10px 10px;
  text-align: right;
}
@media screen and (max-width: 1000px) {
  .block {
    text-align: center;
  }
}
</style>
