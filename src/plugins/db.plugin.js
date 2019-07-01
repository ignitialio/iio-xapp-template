export default {
  install:
    function (Vue) {
      Vue.prototype.$db = {
        collection: async function(name) {
          return (await Vue.prototype.$services
            .waitForService(Vue.prototype.$config.data.service + ':' + name))
        }
      }
    }
}
