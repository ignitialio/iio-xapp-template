<template>
  <div class="main-layout tw-w-full">

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  watch: {},
  components: {
  },
  computed: {},
  methods: {},
  mounted() {
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

    this.$services.waitForService(this.$config.data.service + ':notifications')
      .then(notificationsCollection => {
        notificationsCollection.dPut({
          text: 'Tralalalalallalalalallal bip bip',
          username: this.$store.state.user.login.username
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  },
  beforeDestroy() {

  }
}
</script>

<style>
.main-layout {
  height: calc(100% - 0px);
}
</style>
