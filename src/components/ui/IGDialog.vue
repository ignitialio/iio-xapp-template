<template>
  <div class="dialog-layout tw-absolute
    tw-w-screen tw-h-screen tw-pointer-events-none
    tw-flex tw-justify-center tw-items-center">
    <div class="modal tw-z-10
      tw-w-screen tw-h-screen tw-pointer-events-none"
      :class="{ 'tw-pointer-events-auto': value }"></div>

    <div class="dialog
      tw-pointer-events-auto
      tw-bg-white tw-shadow" :class="{ 'open': value }">

      <div v-if="header"
        class="tw-w-full tw-h-16 tw-bg-yellow-600 tw-flex">
        <div class="tw-m-2 tw-text-gray-200">
          <div class="tw-text-md">{{ title }}</div>
          <div class="tw-text-sm">{{ user.email }}</div>
        </div>
      </div>

      <ig-list>
        <ig-menuitem
          v-for="(item, index) in menuItems" :key="index"
          :item="item" @select="handleSelect"></ig-menuitem>
      </ig-list>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ig-dialog',
  props: {
    value: {
      type: Boolean
    }
  },
  data: () => {
    return {
    }
  },
  methods: {

  },
  mounted() {

  },
  computed: {
  }
}
</script>

<style scoped>
.dialog-layout {

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
