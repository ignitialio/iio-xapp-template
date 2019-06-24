<template>
  <transition name="fade">
    <component v-if="ready" is="signin"></component>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      ready: false
    }
  },
  mounted() {
    // wait for authentication service
    this.$services.waitForService(this.$config.auth.service).then(authService => {
      this.ready = true
    }).catch(err => console.log(err))
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
