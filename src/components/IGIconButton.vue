<template>
  <div class="tw-cursor-pointer tw-select-none
    tw-flex tw-w-12 tw-h-12
    tw-justify-center tw-items-center
    hover:tw-text-yellow-500 active:tw-text-yellow-600"
    @click="handleClick">
    <i class="material-icons tw-text-6xl">{{ type }}</i>
  </div>
</template>

<script>
export default {
  name: 'ig-iconbutton',
  props: {
    type: String
  },
  data: () => {
    return {
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
@media screen and (max-width: 800px) {

}
</style>
