import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import store from '../store'
const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/Layout'),
      meta: { selected: '/' },
      children: [
        { path: 'menu', component: () => import('../components/menu/index'), meta: { selected: '/menu' } },
        { path: 'menu/add', component: () => import('../components/menu/info'), meta: { selected: '/menu' } },
        { path: 'menu/:id', component: () => import('../components/menu/info'), meta: { selected: '/menu' } },
        { path: 'role', component: () => import('../components/role/index'), meta: { selected: '/role' } },
        { path: 'role/add', component: () => import('../components/role/info'), meta: { selected: '/role' } },
        { path: 'role/:id', component: () => import('../components/role/info'), meta: { selected: '/role' } },
        { path: 'user', component: () => import('../components/user/index'), meta: { selected: '/user' } },
        { path: 'user/add', component: () => import('../components/user/info'), meta: { selected: '/user' } },
        { path: 'user/:id', component: () => import('../components/user/info'), meta: { selected: '/user' } },
      ]
    },
    { path: '/login', component: () => import('../components/Login') }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login') {
    var userinfo = store.state.userinfo;//从仓库中读取数据
    if (userinfo !== null) {
      //验证用户访问的路由规则是否在分配的路由规则中
      var nowpath = to.meta.selected;//读取当前路由规则的元信息
      var allowpath = userinfo.menus_url;
      //把没有纳入到权限管理的公用路由规则，加入到可以访问的路由规则中
      if(allowpath.indexOf('/')<0){
        allowpath.push('/')
      }
      if(allowpath.indexOf(nowpath)>=0){
        next()//如果当前访问的路由规则，在允许访问的数组中，则执行摩恩的路由规则
      }else{
        next('/')//否则跳转到首页
      }
    } else {
      next('/login')
    }
  } else {
    next();
  }
})

export default router;
