<template>
  <transition name="fade">
    <div v-if="ready" class="tw-w-full tw-h-full main-layout">

    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      ready: false
    }
  },
  watch: {},
  components: {
  },
  computed: {},
  methods: {},
  mounted() {
    this.ready = true
  },
  beforeDestroy() {

  }
}
</script>

<style scoped>
.main-layout {
  
}
</style>
