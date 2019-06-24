<template>
  <div :id="id" class="users-layout tw-w-full">
    <div class="left-panel lg:tw-w-1/3 tw-relative">
      <ig-progressbar v-if="loading"
        indeterminate class="tw-absolute"></ig-progressbar>
      <ig-list class="list">
        <ig-listitem v-for="(user, index) in users" :key="index"
          :item="user" @select="selected = $event"
          :title="user.name.first + ' ' + user.name.last"
          :subtitle="user.email"
          :picture="user.picture.medium"
          avatar
          @outDown="handleScroll"></ig-listitem>
      </ig-list>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  data() {
    return {
      id: 'li_' + Math.random().toString(36).slice(2),
      ready: false,
      users: [],
      selected: null,
      loading: false
    }
  },
  methods: {
    handleScroll(event) {
      let element = event.target

      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.showNextElements()
      }
    },
    showNextElements() {
      this.loading = true
      this.users = _.concat(this.users,
        _.slice(this.usersData, this.nextIndex, this.nextIndex + 100))
      this.nextIndex += 100
      setTimeout(() => this.loading = false, 500)
    }
  },
  mounted() {
    let listEl = d3.select('#' + this.id).select('.list').node()
    listEl.addEventListener('scroll', this.handleScroll.bind(this))

    // wait for users data service
    this.$services.waitForService(this.$config.data.service + ':users')
      .then(usersCollection => {
        this.ready = true
        usersCollection.dFind({}).then(docs => {
          this.usersData = docs
          this.nextIndex = 0
          this.showNextElements()
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  }

}
</script>

<style>
.users-layout {
  height: calc(100% - 0px);
}

.left-panel {
  height: calc(100% - 0px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
