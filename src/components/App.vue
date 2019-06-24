<template>
  <div class="tw-w-screen tw-h-screen tw-relative">
    <router-view class="app-router blurrable
      tw-absolute tw-left-0 tw-w-full tw-overflow-hidden"
      :class="{ 'hidden': showMenu }"></router-view>

    <ig-toolbar v-if="$store.state.user"
      class="tw-absolute tw-top-0 tw-left-0"
      :showMenu.sync="showMenu"></ig-toolbar>

    <ig-toolbar v-if="!$store.state.user" onlyTitleBar
      class="tw-absolute tw-top-0 tw-left-0">
      <ig-icon src="assets/ignitialio-32.png"></ig-icon>
    </ig-toolbar>

    <ig-sidedrawer v-model="showMenu"
      :user="$store.state.user"
      :menuItems="$store.state.menuItems"></ig-sidedrawer>
  </div>
</template>

<script>
import UsersView from '../views/UsersView.vue'
import ServicesView from '../views/ServicesView.vue'

export default {
  data: () => {
    return {
      showMenu: false
    }
  },
  methods: {
    handleMenuItemsAdd(items) {
      let routes = []
      let menuItems = this.$store.state.menuItems

      for (let item of items) {
        let idx = _.findIndex(menuItems, e => e.title === item.title)

        if (idx === -1) {
          item.selected = false
          menuItems.push(item)

          if (item.route) {
            if (!item.anonymousAccess) {
              item.route.beforeEnter = (to, from, next) => {
                let token = localStorage.getItem('token')

                if (token && token !== null) {
                  next()
                } else {
                  next({ path: '/login' })
                }
              }
            }

            routes.push(item.route)
          }
        }
      }

      this.$store.commit('menuItems', menuItems)

      if (routes.length > 0) {
        this.$router.addRoutes(routes)
      }
    },
    handleMenuItemsRemove(items) {
      let menuItems = this.$store.state.menuItems

      for (let item of items) {
        let idx = _.findIndex(menuItems, e => e.path === item.path)

        if (idx) {
          this.menuItems.splice(idx, 1)
        }
      }

      this.$store.commit('menuItems', menuItems)
    },
    handleNotification(data) {
      console.log('notification', data)
    }
  },
  mounted() {
    // reset menu
    this.$store.commit('menuItems', [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        anonymousAccess: false,
        route: {
          path: '/'
        },
        selected: false
      }
    ])

    // menu items registering
    this.$services.on('app:menu:add', this.handleMenuItemsAdd)
    this.$services.on('app:menu:remove', this.handleMenuItemsRemove)

    // base menu
    this.$services.emit('app:menu:add', [
      {
        title: 'Users',
        icon: 'supervisor_account',
        anonymousAccess: false,
        route: {
          path: '/users',
          component: UsersView
        }
      },
      {
        title: 'Services',
        icon: 'view_module',
        anonymousAccess: false,
        route: {
          path: '/services',
          component: ServicesView
        }
      },
      {
        title: 'Sign out',
        icon: 'lock_open',
        anonymousAccess: false,
        event: 'app:signout'
      }
    ])

    // update router with redirection
    this.$router.addRoutes([
      {
        path: '*',
        redirect: '/'
      }
    ])

    // app sign in event
    this.$services.on('app:signin', info => {
      this.$store.commit('user', info.user)
      localStorage.setItem('token', info.token)
      this.$router.push('/')
    })

    // app sign out event
    this.$services.on('app:signout', () => {
      this.$ws.resetLocalCredentials()
      this.$router.push('/login')
    })

    this.$ws.socket.on('service:event:dlake:notifications:add',
      this.handleNotification)
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
  transition: filter 1s cubic-bezier(0.3, 0.7, 1.0, 0.3); /* cubic-bezier(0.1, 0.7, 1.0, 0.1); */
  filter: blur(0);
}

.blurrable.hidden {
  filter: blur(4px);
}

@media screen and (max-width: 800px) {

}
</style>
