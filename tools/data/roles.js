module.exports = {
  __privileged__: {
    'auth': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'dlake': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'dlake:users': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'bob': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'ted': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    }
  },
  admin: {
    'auth': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'dlake': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'dlake:users': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'bob': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'ted': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    }
  },
  user: {
    'auth': {
      'create:own': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'dlake': {
      'read:any': [ '*' ]
    },
    'dlake:users': {
      'read:any': [ '*' ],
      'update:own': [ '*' ],
      'delete:own': [ '*' ]
    },
    'bob': {
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    },
    'ted': {
      'create:any': [ '*' ],
      'read:any': [ '*' ],
      'update:any': [ '*' ],
      'delete:any': [ '*' ]
    }
  },
  anonymous: {
    'auth': {
      'update:any': [ '*' ],
      'read:any': [ '*' ]
    },
    'dlake': {
      'read:any': [ '*' ]
    },
    'dlake:users': {
      'read:any': [ '_id', 'name' ]
    },
    'bob': {
      'read:any': [ '*' ]
    },
    'ted': {
      'read:own': [ '*' ]
    }
  }
}
