<template>
  <div class="tw-w-screen tw-h-screen tw-relative">
    <router-view class="app-router blurrable tw-absolute tw-left-0 tw-w-screen tw-h-screen"
      :class="{ 'hidden': showMenu }"></router-view>

    <ig-toolbar v-if="$store.state.user"
      class="tw-absolute tw-top-0 tw-left-0"
      :showMenu.sync="showMenu"></ig-toolbar>

    <ig-toolbar v-if="$store.state.user"
      class="tw-absolute tw-top-0 tw-left-0"
      :showMenu.sync="showMenu"></ig-toolbar>

    <ig-sidedrawer v-model="showMenu"></ig-sidedrawer>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data: () => {
    return {
      showMenu: false
    }
  },
  methods: {
  },
  mounted() {
    this.$services.on('signin', info => {
      this.$store.commit('user', info.user)
      localStorage.token = info.token
      this.$router.push('/')
    })

    this.$services.on('signout', () => {
      this.$ws.resetLocalCredentials()
      this.$router.push('/signin')
    })
  },
  computed: {
  }
}
</script>

<style scoped>
.app-router {
  top: 48px;
  height: calc(100% - 48px);
}

.blurrable {
  transition: filter 1s cubic-bezier(0.3, 0.7, 1.0, 0.8); /* cubic-bezier(0.1, 0.7, 1.0, 0.1); */
  filter: blur(0);
}

.blurrable.hidden {
  filter: blur(4px);
}

@media screen and (max-width: 800px) {

}
</style>
