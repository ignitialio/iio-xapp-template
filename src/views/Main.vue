<template>
  <transition name="fade">
    <div v-if="ready" class="main-layout tw-w-full tw-h-full">

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

    // wait for login
    this.$services.waitForProperty(this.$store.state, 'user').then(async () => {
      let myunified = await this.$services.waitForService('myunified')
      let result = await myunified.myServiceMethod()
      console.log('service method result= ', result)
      let myaddon = await this.$modules.waitForModule('myaddon')
      result = await myaddon.myAddOnMethod()
      console.log('module method result= ', result)

      // check service access
      result = await myunified.myProtectedServiceMethod()
    }).catch(err => console.log(err))
  },
  beforeDestroy() {

  }
}
</script>

<style>
.main-layout {
}
</style>
