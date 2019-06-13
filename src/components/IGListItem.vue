<template>
  <div class="listitem-layout tw-w-full tw-h-10
      tw-flex tw-p-4
      tw-border-b tw-border-yellow-300
      tw-text-gray-700 hover:tw-text-yellow-700 hover:tw-bg-gray-100
      tw-cursor-pointer tw-select-none"
    :class="{ 'tw-bg-yellow-700 tw-text-white' : i_selected }"
    @click="handleClick">
    
    <div v-if="$utils.getByPath(item, pictureProperty)" class="tw-flex tw-justify-center tw-items-center">
      <img class="tw-w-10 tw-h-10" :src="$utils.getByPath(item, pictureProperty)"/>
    </div>
    <div class="listitem-text tw-m-4 tw-w-full tw-flex tw-flex-col tw-justify-center">
      <div class="tw-font-bold tw-w-full">{{ $t($utils.getByPath(item, titleProperty)) }}</div>
      <div v-if="$utils.getByPath(item, subtitleProperty)" class="tw-w-full">
        {{ $t($utils.getByPath(item, subtitleProperty)) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ig-listitem',
  props: {
    selected: {
      type: Boolean
    },
    pictureProperty: {
      type: String,
      default: 'picture'
    },
    titleProperty: {
      type: String,
      default: 'title'
    },
    subtitleProperty: {
      type: String,
      default: 'subtitle'
    },
    item: {}
  },
  data: () => {
    return {
      i_selected: false
    }
  },
  watch: {
    selected: function(val) {
      this.i_selected = val
    }
  },
  methods: {
    handleClick() {
      this.$emit('select', this.item)
      this.$emit('update:selected', !this.i_selected)
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
.listitem-layout {

}

.listitem-text {
  flex: 1;
}

@media screen and (max-width: 800px) {

}
</style>
