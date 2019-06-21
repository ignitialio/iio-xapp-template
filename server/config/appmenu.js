module.exports = {
  items: [
    {
      path: '/',
      title: 'Dashboard',
      icon: 'dashboard',
      anonymousAccess: true
    },
    {
      path: '/users',
      title: 'Users',
      icon: 'supervisor_account',
      anonymousAccess: true
    },
    {
      path: '/services',
      title: 'Services',
      icon: 'view_module',
      anonymousAccess: true
    },
    {
      title: 'Sign out',
      icon: 'lock_open',
      anonymousAccess: false,
      event: 'signout'
    }
  ],
  _unified: true
}
