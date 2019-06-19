<template>
  <div v-if="item.anonymousAccess || (item.hideIfLogged && !$store.user)"
    class="menuitem-layout tw-w-full tw-h-10
      tw-flex tw-items-center tw-px-4
      tw-border-b tw-border-yellow-300
      tw-text-gray-700 hover:tw-text-yellow-700 hover:tw-bg-gray-100
      tw-cursor-pointer tw-select-none"
    :class="{ 'tw-text-yellow-500': iSelected }"
    @click="handleClick">
    <i class="material-icons tw-text-6xl">{{ item.icon }}</i>
    <span class="tw-m-4">{{ $t(item.title) }}</span>
  </div>
</template>

<script>
export default {
  name: 'ig-menuitem',
  props: {
    item: {},
    selected: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      iSelected: false
    }
  },
  watch: {
    selected: function(val) {
      this.iSelected = val
    }
  },
  methods: {
    handleClick() {
      this.$emit('select', this.item)
      this.$emit('update:selected', !this.iSelected)
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
.menuitem-layout {

}

@media screen and (max-width: 800px) {

}
</style>
