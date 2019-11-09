<template>
  <div class="NavigationRecord">
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
      <div ref="scroll" class="NavigationRecord2">
        <el-tag
          v-for="(tag,index) in tags"
          :key="tag.name"
          :closable="tags.length==1?false:true"
          :disable-transitions="false"
          :type="tags_index == index?'warning':''"
          @close="handleClose(tag,index)"
          @click="tojump(tag.path,index)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      levelList: [],
      tags_stats: 1,
      tags_index: 0,
      ScrollLeft: 0
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  watch: {
    '$route'() {
      this.tags_stats = 1
      this.tags.forEach((item, index) => {
        console.log(item.name === this.$route.meta.title)
        if (item.name === this.$route.meta.title) {
          this.tags_stats = 2
          this.tags_index = index
          return
        }
      })
      if (this.tags_stats === 1) {
        this.tags.push({ name: this.$route.meta.title, path: this.$route.path })
        console.log(this.tags.length)
        this.tags_index = this.tags.length - 1
      }
    }
  },
  created() {
    this.getBreadcrumb()
  },
  mounted() {},
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    handleClose(tag, index) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      if (this.tags_index === index) {
        if (index === 0 && this.tags.length > 0) {
          this.tags_index = 0
          this.$router.push({ path: this.tags[0].path })
        } else {
          this.tags_index = index - 1
          this.$router.push({ path: this.tags[index - 1].path })
        }
      } else {
        this.tags_index = this.tags_index - 1
      }
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      if (this.levelList.length === 1) {
        this.tags.push({ name: 'Dashboard', path: '/dashboard' })
        return
      }
      this.tags.push({ name: (this.levelList.pop()).meta.title, path: (this.levelList.pop()).path })
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    tojump(path, index) {
      console.log(path, index)
      this.tags_index = index
      this.$router.push({ path: path })
    }
  }
}
</script>
<style lang="scss" scoped>
.NavigationRecord{
  height: 40px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  white-space:nowrap;
  padding: 3px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  // top: -30px;
  // left: 10px;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
.el-button--info{
  width: 15px;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
.el-button--info:nth-of-type(1){
  float: left;
  z-index: 9999;
}
.el-button--info:nth-of-type(2){
  float: right;
  z-index: 9999;
}
.el-tag--warning::before{
 background: #ffc964 !important;
}
.el-tag::before{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #a6d2ff;
  display: inline-block;
  content: close-quote;
  margin-right: 6px;
}
.el-tag{
  margin-left: 10px;
}
.el-tag:hover{
  cursor: pointer;
}
</style>
