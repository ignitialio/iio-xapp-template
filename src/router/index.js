import Router from 'vue-router'

import Login from '../views/Login.vue'
import Services from '../views/Services.vue'
import Main from '../views/Main.vue'

var routerInstance

export function getRouter(Vue) {
  if (routerInstance) return routerInstance
  Vue.use(Router)

  routerInstance =  new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        name: 'root',
        component: Main/*,
        beforeEnter: (to, from, next) => {
          let token = localStorage.getItem('token')
          if (token && token !== 'null') {
            next()
          } else {
            next({ path: '/login' })
          }
        }*/
      }, {
        path: '/services',
        component: Services/*,
        beforeEnter: (to, from, next) => {
          let token = localStorage.getItem('token')
          if (token && token !== 'null') {
            next()
          } else {
            next({ path: '/login' })
          }
        }*/
      }, {
        path: '*',
        redirect: '/'
      }
    ]
  })

  return routerInstance
}
