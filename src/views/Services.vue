<template>
  <div class="services-layout">
    <ig-list class="services-left tw-m-1 tw-shadow t-h-full"
      :items="services"
      itemRenderer="ig-listitem"
      @select="handleSelect"
      pictureProperty="options.description.icon"
      titleProperty="name"
      subtitleProperty="options.description.title">
    </ig-list>

    <div class="services-right">
      <component :is="selected.name" class="service-component"
        v-if="selected && selected.options.uiComponentInjection"></component>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data: () => {
    return {
      selected: null,
      services: null
    }
  },
  methods: {
    onServiceUp(service) {
      // console.log(this.$i18n._translations)
      this.services = _.sortBy(_.values(this.$services.servicesDico), [ 'name' ])
    },
    onServiceDown(service) {
      this.services = _.sortBy(_.values(this.$services.servicesDico), [ 'name' ])
      if (this.selected && service === this.selected.name) {
        this.selected = null
      }
    },
    handleSelect(service) {
      this.selected = service
    }
  },
  mounted() {
    // listeners
    this._listeners = {
      onServiceUp: this.onServiceUp.bind(this),
      onServiceDown: this.onServiceDown.bind(this)
    }
    this.$services.on('service:up', this._listeners.onServiceUp)
    this.$services.on('service:down', this._listeners.onServiceDown)

    this.services = _.sortBy(_.values(this.$services.servicesDico), [ 'name' ])

    this.$services.waitForService('iiost').then(iiost => {
      iiost.oneGetServiceMethod({ toto: 'titi' }).then(result => {
        console.log(result)
      }).catch(err => console.log(err))

      iiost.onePostServiceMethod({ toto: 'titi' }).then(result => {
        console.log(result)
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))

    this.$modules.waitForModule('dlake', 'users').then(users => {
      users.d_find({ }).then(result => {
        console.log(result)
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  },
  beforeDestroy() {
    this.$services.off('service:up', this._listeners.onServiceUp)
    this.$services.off('service:down', this._listeners.onServiceDown)
  }
}
</script>

<style scoped>
.services-layout {
  width: 100%;
  display: flex;
}

.services-left {
  width: 25%;
}

.services-right {
  width: 75%;
  height: 100%;
}

.service-component {
  margin: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>
