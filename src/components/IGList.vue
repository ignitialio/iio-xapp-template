<template>
  <div class="list-layout tw-flex tw-flex-col tw-overflow-y-auto">
    <component :is="itemRenderer" v-for="(item, index) in items" :key="index"
      :item="item" @select="handleSelect(item)"
      :pictureProperty="pictureProperty"
      :titleProperty="titleProperty"
      :subtitleProperty="subtitleProperty"></component>
  </div>
</template>

<script>
export default {
  name: 'ig-list',
  props: {
    itemRenderer: {
      type: String,
      default: 'ig-itemlist'
    },
    pictureProperty: {
      type: String
    },
    titleProperty: {
      type: String
    },
    subtitleProperty: {
      type: String
    },
    items: {}
  },
  data: () => {
    return {

    }
  },
  methods: {
    handleSelect(item) {
      this.$emit('select', item)
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
.list-layout {

}

@media screen and (max-width: 800px) {

}
</style>
