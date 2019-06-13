import './registerServiceWorker'

import Vue from 'vue'
import {sync} from 'vuex-router-sync'

import './main.css'
import 'typeface-roboto'
import 'material-design-icons/iconfont/material-icons.css'
import * as d3 from 'd3'

import App from './components/App.vue'
import {getRouter} from './router'
import {getStore} from './store'

// Vue plugins
import wsPlugin from './plugins/ws.plugin'
import servicesPlugin from './plugins/services.plugin'
import modulesPlugin from './plugins/modules.plugin'
import i18nPlugin from './plugins/i18n.plugin'
import configPlugin from './plugins/config.plugin'
import utilsPlugin from './plugins/utils.plugin'

// Base components
import IGIconButton from './components/IGIconButton.vue'
import IGSideDrawer from './components/IGSideDrawer.vue'
import IGToolbar from './components/IGToolbar.vue'
import IGList from './components/IGList.vue'
import IGMenuItem from './components/IGMenuItem.vue'
import IGListItem from './components/IGListItem.vue'

// -----------------------------------------------------------------------------
// Specific imports

import storeModule from './store/store.module'

import Main from './views/Main.vue'
// -----------------------------------------------------------------------------

// Vue configuration
Vue.config.productionTip = false

// get instances
let router = getRouter(Vue)
let store = getStore(Vue)

// -----------------------------------------------------------------------------
// Specific store
store.registerModule('iioat', storeModule)
// -----------------------------------------------------------------------------

// router sync
sync(store, router)

// Vue plugins use
Vue.use(utilsPlugin)
Vue.use(wsPlugin)
Vue.use(servicesPlugin)
Vue.use(modulesPlugin)
Vue.use(i18nPlugin)
Vue.use(configPlugin)

// initialize components
Vue.component('ig-iconbutton', IGIconButton)
Vue.component('ig-sidedrawer', IGSideDrawer)
Vue.component('ig-toolbar', IGToolbar)
Vue.component('ig-list', IGList)
Vue.component('ig-menuitem', IGMenuItem)
Vue.component('ig-listitem', IGListItem)


// waiting for asyncrounous plugins to be ready (here i18n)
Vue.prototype.$utils
  .waitForProperties(Vue.prototype, ['$i18n', '$config' ]).then(async () => {
  // create app
  const app = new Vue({
    router,
    store,
    ...App
  })

  // on service up (unified services)
  app.$services.on('service:up', service => {
    if (!service) {
      console.log('something weird there when service up')
      return
    }

    switch (service.name) {
      case 'auth':
        if (app.$store.state.user) {
          app.$services.auth.authenticate({
            username: app.$store.state.user.username,
            token: localStorage.token
          }).then(() => {
            console.log('authenticated')
            app.$ws.socket._logged = true
            app.$services.$emit('app:login')
          }).catch(err => {
            console.log('authentication failed', err)
            // app.$ws.resetLocalCredentials()
            // app.$router.push('/login')
            app.$services.$emit('app:logout')
          })
        }
        break
      default:
    }
  })

  // manage splashscreen/progress
  d3.select('#splashscreen').style('opacity', 0)
  d3.select('#progress').style('opacity', 0)

  setTimeout(() => {
    d3.select('#splashscreen').remove()
    d3.select('#progress').remove()
  }, 1000)

  app.$mount('#app')
}).catch(err => console.log(err))
