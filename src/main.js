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
import IGInput from './components/IGInput.vue'
import IGPaper from './components/IGPaper.vue'

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
Vue.component('ig-input', IGInput)
Vue.component('ig-paper', IGPaper)


// waiting for asyncrounous plugins to be ready (here i18n)
Vue.prototype.$utils
  .waitForProperties(Vue.prototype, ['$i18n', '$config' ]).then(async () => {
  // create app
  const app = new Vue({
    router,
    store,
    ...App
  })

  app.$services.waitForService('auth').then(async authService => {
    try {
      if (localStorage.token) {
        await authService.authenticate(localStorage.token)
        console.log('authenticated')
      } else {
        app.$ws.resetLocalCredentials()
        app.$router.push('/signin')
      }
    } catch (err) {
      this.$ws.resetLocalCredentials()
      console.log(err)
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
