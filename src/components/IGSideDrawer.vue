<template>
  <div class="tw-absolute tw-w-screen tw-h-screen tw-pointer-events-none">
    <div class="modal tw-absolute tw-z-10
      tw-w-screen tw-h-screen" :class="{ 'open': value }"
      @click="handleClose"></div>

    <div class="drawer tw-absolute tw-h-full tw-top-0 tw-z-20
      tw-pointer-events-auto
      tw-bg-white tw-shadow" :class="{ 'open': value }">

      <div v-if="header"
        class="tw-w-full tw-h-24 tw-bg-yellow-600">

      </div>

      <ig-list :items="menuItems" @select="handleSelected">
        <ig-menuitem v-if="item" v-for="(item, index) in menuItems" :key="index"
          :item="item" @select="handleSelected"></ig-menuitem>
      </ig-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ig-sidedrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      menuItems: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    handleSelected(e) {
      this.$emit('input', false)
      this.$router.push(e.path)
      console.log(JSON.stringify(e, null, 2))
    },
    handleMenuItemsAdd(items) {
      let routes = []
      for (let item of items) {
        this.menuItems.push(item)
        if (item.route) {
          routes.push(item.route)
        }
      }

      if (routes.length > 0) {
        this.$router.addRoutes(routes)
      }
    }
  },
  mounted() {
    this._listeners = {
      onMenuItemsAdd: this.handleMenuItemsAdd.bind(this)
    }

    this.menuItems = this.$config.appMenu.items

    this.$services.on('app:menu:add', this._listeners.onMenuItemsAdd)
  },
  beforeDestroy() {
    this.$services.off('app:menu:add', this._listeners.onMenuItemsAdd)
  }
}
</script>

<style scoped>
.drawer {
  width: 300px;
  left: -300px;
  background-color: rgba(255, 255, 255, 0.75);
  transition: left 1s ease;
}

.drawer.open {
  left: 0;
}

.modal {
  pointer-events: none;
}

.modal.open {
  pointer-events: auto;
}

@media screen and (max-width: 800px) {

}
</style>
