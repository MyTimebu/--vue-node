<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <div @click="drawer = true">记录板</div>
          </el-dropdown-item>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-drawer
      title="当前位置：记录板"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <template slot="prepend">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
          </template>
          <el-button slot="append" icon="el-icon-coffee-cup"></el-button>
        </el-input>
      </div>
      <div>
        <h2>正在进行：</h2>
        <div class="Underway">
          <div v-for="city in weixuanzhong" :key="city">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <i class="el-icon-close"></i>
          </div>
        </div>
        <h2>已经完成：</h2>
        <div class="Underway">
          <div v-for="city in xuanzhong" :key="city">
            <el-checkbox-group
              v-model="checkedCities"
              @click="handleCheckedCitiesChange"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox :label="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      input3: "",
      select: "",
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: [],
      weixuanzhong: [],
      xuanzhong: [],
      isIndeterminate: true
    };
  },
  created() {
    const cityOptions = ["上海", "北京", "广州", "深圳"];
    this.cities = cityOptions
    this.weixuanzhong = [...this.cities]
    this.xuanzhong = this.checkedCities
    this.bibao()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar")
    },
    async logout() {
      await this.$store.dispatch("user/logout")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleCheckAllChange(val) {
      const cityOptions = ["上海", "北京", "广州", "深圳"];
      this.checkedCities = val ? cityOptions : [];
      this.xuanzhong = this.checkedCities
      this.isIndeterminate = false
      this.weixuanzhong = [...this.cities]
      this.bibao();
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      this.xuanzhong = this.checkedCities
      this.weixuanzhong = [...this.cities]
      this.bibao()
    },
    bibao: (() => {
      return function() {
        for (let index = 0; index < this.weixuanzhong.length; index++) {
          for (let i = 0; i < this.checkedCities.length; i++) {
            if (this.weixuanzhong[index] === this.checkedCities[i]) {
              let shuju = this.weixuanzhong.splice(index, 1)
              this.bibao()
              return
            }
          }
        }
      };
    })()
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.Underway {
  padding: 20px;
  box-sizing: border-box;
  > div {
    width: 100%;
    height: 30px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgb(223, 223, 223);
    position: relative;
    margin-top: 10px;
    padding-top: 6px;
    padding-left: 8px;
    box-sizing: border-box;
    &:nth-child(1) {
      margin-top: 0px;
    }
    .el-icon-close{
      position: absolute;
      top: 8px;
      right: 10px;
      color: #dbdbdb;
      cursor: pointer;
    }
    .el-icon-close:hover{
      color: #5a5e66;
    }
  }
  /deep/.el-checkbox-group{
    .is-checked{
      .el-checkbox__inner{
        background: #9cb9be;
        border-color: #7ea0a7;
      }
      .el-checkbox__inner:hover{
        background: #5c777c;
        border-color: #81cbd8;
      }
      .el-checkbox__label{
        color:#9cb9be;
        text-decoration:line-through; 
      }
      .el-checkbox__label:hover{
        color:#81cbd8;
        text-decoration:line-through; 
      }
    }
  }
}

// /deep/.is-checked{
//   .el-checkbox__inner{
//     background: #9cb9be;
//     border-color: #7ea0a7;
//   }
//   .el-checkbox__label{
//     color:#9cb9be;
//     text-decoration:line-through; 
//   }
// }
</style>
