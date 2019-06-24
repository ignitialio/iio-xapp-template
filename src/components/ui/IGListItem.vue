<template>
  <div class="listitem-layout tw-w-full tw-h-12
      tw-flex
      tw-border-b tw-border-yellow-300
      tw-text-gray-700 hover:tw-text-yellow-700 hover:tw-bg-gray-100
      tw-cursor-pointer tw-select-none"
    :class="{ 'tw-bg-yellow-700 tw-text-white' : iSelected }"
    @click="handleClick">

    <div v-if="$utils.getByPath(item, pictureProperty) || picture"
      class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12">
      <img v-if="$utils.getByPath(item, pictureProperty)"
        class="tw-w-8 tw-h-8" :src="$utils.getByPath(item, pictureProperty)"/>
      <img v-if="picture"
        class="tw-w-8 tw-h-8" :src="picture"/>
    </div>

    <div class="listitem-text tw-mx-4 tw-w-full tw-flex tw-flex-col tw-justify-center tw-overflow-hidden">
      <div class="tw-font-bold tw-w-full">{{ $t($utils.getByPath(item, titleProperty)) }}</div>
      <div v-if="$utils.getByPath(item, subtitleProperty)"
        class="ig-ellipsis tw-w-full tw-text-xs tw-h-4">
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
    picture: {},
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
    this.$emit('mounted')
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
