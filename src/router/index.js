import Router from 'vue-router'

import ServicesView from '../views/ServicesView.vue'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'

var routerInstance

export function getRouter(Vue) {
  if (routerInstance) return routerInstance
  Vue.use(Router)

  routerInstance =  new Router({
    mode: 'hash',
    routes: [
      {
        path: '/',
        name: 'root',
        component: MainView,
        beforeEnter: (to, from, next) => {
          let token = localStorage.getItem('token')
          if (token && token !== 'null') {
            next()
          } else {
            next({ path: '/login' })
          }
        }
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView
      }
    ]
  })

  return routerInstance
}
