import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/',
        component: () => import('../components/Layout'),
        children:[
          {path:'menu',component:()=>import('../components/menu/index')},
          {path:'menu/add',component:()=>import('../components/menu/info')},
        ]
       }
  ]
})
