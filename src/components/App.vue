<template>
  <div class="tw-w-screen tw-h-screen tw-relative">
    <router-view class="app-router blurrable
      tw-absolute tw-left-0 tw-w-full tw-overflow-hidden"
      :class="{ 'hidden': showMenu }"></router-view>

    <ig-toolbar v-if="$store.state.user"
      class="tw-absolute tw-top-0 tw-left-0 tw-shadow"
      :showMenu.sync="showMenu">
      <component v-if="contextComponent" :is="contextComponent"></component>
    </ig-toolbar>

    <ig-toolbar v-if="!$store.state.user" onlyTitleBar
      class="tw-absolute tw-top-0 tw-left-0">
      <ig-icon src="assets/ignitialio-32.png"></ig-icon>
    </ig-toolbar>

    <ig-progressbar v-if="showProgressBar" class="tw-fixed" v-model="progress"/>

    <ig-sidedrawer v-model="showMenu"
      :user="$store.state.user"
      :menuItems="$store.state.menuItems"></ig-sidedrawer>

    <ig-notification class="tw-absolute" v-model="notification"/>
  </div>
</template>

<script>
import UsersView from '../views/UsersView.vue'
import ServicesView from '../views/ServicesView.vue'
import ListView from '../views/ListView.vue'
import ItemView from '../views/ItemView.vue'

import MyItemsView from '../views/MyItemsView.vue'

import UsersContextBar from '../views/context/UsersContextBar.vue'
import ListContextBar from '../views/context/ListContextBar.vue'
import ItemContextBar from '../views/context/ItemContextBar.vue'
import MyItemsContextBar from '../views/context/MyItemsContextBar.vue'

export default {
  data: () => {
    return {
      showMenu: false,
      showProgressBar: false,
      notification: null,
      contextComponent: null,
      progress: 50
    }
  },
  components: {
    'users-ctx': UsersContextBar,
    'list-ctx': ListContextBar,
    'item-ctx': ItemContextBar,
    'myitems-ctx': MyItemsContextBar
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
    },
    checkIfAdminRole() {
      this.$utils.waitForProperty(this.$store.state, 'user').then(user => {
        this.$services.waitForService(this.$config.auth.service).then(auth => {
          auth.role(user.login.username).then(role => {
            user.role = role
            this.$store.commit('user', user)
          }).catch(err => console.log('failed to get user\'s role'))
        })
      }).catch(err => console.log('not connected user'))
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
        title: 'Test',
        icon: 'explore',
        anonymousAccess: false,
        route: {
          path: '/myitems',
          component: MyItemsView
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
      },
      {
        /* List route, no menu */
        title: 'List view',
        hidden: true, /* do not show it in the menu */
        anonymousAccess: false,
        route: {
          path: '/list',
          component: ListView
        }
      },
      {
        /* Item route, no menu */
        title: 'Item view',
        hidden: true, /* do not show it in the menu */
        anonymousAccess: false,
        route: {
          path: '/item',
          component: ItemView
        }
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
      // determine if admin role when login
      this.checkIfAdminRole()

      this.$router.push('/')
    })

    // app sign out event
    this.$services.on('app:signout', () => {
      this.$ws.resetLocalCredentials()
      if (this.$router.currentRoute.path !== '/login') {
        this.$router.push('/login')
      }
    })

    this.$ws.socket.on('service:event:dlake:notifications:add',
      this.handleNotification)

    // determine if admin role when authentication without login
    this.checkIfAdminRole()

    // context bar management
    this.$services.on('app:context:bar', ctxComponent => {
      // use null to disable
      this.contextComponent = ctxComponent
    })

    // application notifications
    this.$services.on('app:notification', message => {
      this.notification = message
    })

    // progress bar events
    this.$services.on('app:progress:show', show => {
      this.showProgressBar = show
      this.$forceUpdate()
      console.log('SHOW', show)
    })

    this.$services.on('app:progress', val => {
      this.progress = val
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
  transition: filter 1s cubic-bezier(0.3, 0.7, 1.0, 0.3); /* cubic-bezier(0.1, 0.7, 1.0, 0.1); */
  filter: blur(0);
}

.blurrable.hidden {
  filter: blur(4px);
}

@media screen and (max-width: 800px) {

}
</style>
