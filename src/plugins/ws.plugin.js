import io from 'socket.io-client'

import {getStore} from '../store'

export default {
  install:
    function (Vue) {
      class WSService extends Vue {
        constructor() {
          super()
          this.$store = getStore(Vue)

          this.uuid = Math.random().toString(36).slice(2)

          this.socket = io.connect()
        }

        resetLocalCredentials() {
          localStorage.token = null
          this.$store.commit('user', null)
        }
      }

      Vue.prototype.$ws = new WSService()
    }
}
