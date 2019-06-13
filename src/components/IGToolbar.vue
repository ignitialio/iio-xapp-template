<template>
  <div class="toolbar-layout tw-w-screen">
    <ig-iconbutton class="tw-absolute tw-top-0 tw-left-0"
      type="menu" @click="handleMenuToggle"></ig-iconbutton>
  </div>
</template>

<script>
export default {
  name: 'ig-toolbar',
  props: {
    showMenu: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {

    }
  },
  methods: {
    handleMenuToggle() {
      this.$emit('update:showMenu', !this.showMenu)
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
.toolbar-layout {
  height: 48px;
}

@media screen and (max-width: 800px) {

}
</style>
