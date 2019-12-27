import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie 从cookie中获取令牌
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration NProgress配置

const whiteList = ['/login'] // no redirect whitelist 在白名单重定向中

router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条
  NProgress.start()

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info 获取用户信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login 移除令牌并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly 在免费登录白名单中，直接进入
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page. 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar 完成进度条
  NProgress.done()
})
