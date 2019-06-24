<template>
  <div class="toolbar-layout tw-w-screen tw-flex">
    <ig-iconbutton src="assets/ignitialio-32.png"
      @click="handleMenuToggle" size="medium"></ig-iconbutton>

    <div class="tw--flex-1 tw-flex tw-justify-center"></div>

    <div class="tw-w-4 tw-h-4"></div>
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

.

@media screen and (max-width: 800px) {

}
</style>
