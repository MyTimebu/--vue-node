<template>
  <div class="yangshi">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;border-radius: 10px 10px 0 0"
    >
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="TableAdd" size="medium">添加</el-button>
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="TableEdit(Number(scope.row.id-1), scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(Number(scope.row.id-1), scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { async } from 'q';
export default {
  data() {
    return {
      tableData: [],
      search: '',
      key: 1,
      page: 1,
      total: 0,
    };
  },
  created() {
    this.TableList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.TableList()
    },
    //增
    TableAdd() {
      let name = ''
      let address = ''
      const h = this.$createElement;
      this.$msgbox({
        title: '更改',
        message: h('div', null, [
          h('span', null, '名字： '),
          h('input', {
            key: this.key++,
            class:'input_mag',
            attrs:{ value: name, id:"hinput"},
            on: {
              input: function(event) {
                name = event.target.value
              }.bind(this)
            }
          }),
          h('br'),
          h('br'),
          h('span', null, '地址： '),
          h('input', {
            key: this.key++,
            class:'input_mag',
            attrs: { value: address, id:"hinput2"},
            on: {
              input: function(event) {
                address = event.target.value
              }.bind(this)
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
      }).then(async (action) => {
        let data = {
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
    // 删
    async handleDelete(index, row) {      
      let data = {
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
      let data = {
        page:this.page
      }
      const list = await this.request({
        url: '/table/list',
        method: 'post',
        data
      })
      console.log(list)
      const { data:tableDatas } = list
      this.tableData = tableDatas.data
      this.total = tableDatas.total
    },
    // 改
    async TableEdit(index, row) {
      console.log(index, row)
      let inde = index
      let name = row.name
      let address = row.address
      let key = 1
      const h = this.$createElement;
      this.$msgbox({
        title: '更改',
        message: h('div', null, [
          h('span', null, '名字： '),
          h('input', {
            key: Number(inde) + key++,
            class:'input_mag',
            attrs:{ value: name, id:"hinput"},
            on: {
              input: function(event) {
                name = event.target.value
              }.bind(this)
            }
          }),
          h('br'),
          h('br'),
          h('span', null, '地址： '),
          h('input', {
            key: Number(inde) + key++,
            class:'input_mag',
            attrs: { value: address, id:"hinput2"},
            on: {
              input: function(event) {
                address = event.target.value
              }.bind(this)
            }
          })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          console.log(action, instance, done)
          if (action === 'confirm') {
            done();
          } else {
            done()
          }
        }
      }).then(async (action) => {
        // console.log(name,address)
        let data = {
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
};
</script>

<style lang="scss" scoped>
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
</style>
