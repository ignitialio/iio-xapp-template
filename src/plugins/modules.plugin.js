import {Modules} from '@ignitial/iio-app-client'

export default {
  install:
    function (Vue) {
      let modules = new Modules(Vue.prototype.$ws.socket)
      modules.initialize(Vue.prototype.$services)
      Vue.prototype.$modules = modules
    }
}
