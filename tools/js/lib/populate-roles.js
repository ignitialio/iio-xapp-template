// const IIOSAccesControl = require('@ignitial/iio-services/lib/accesscontrol').IIOSAccesControl

// TEMP:
const IIOSAccesControl =
  require('@ignitial/iio-app-server/node_modules/@ignitial/iio-services/lib/accesscontrol').IIOSAccesControl

const roles = require('../../data/roles')
var users = require('../../data/users')

exports.populate = async function(setOfUsers) {
  let ac = new IIOSAccesControl({
    namespace: process.env.IIOS_NAMESPACE || 'ignitialio'
  })

  for (let role in roles) {
    await ac.setGrants(role, roles[role])
  }

  users = setOfUsers || users
  for (let user in users) {
    await ac.setUserRole(user, users[user])
  }

  ac._connector.destroy()
  console.log('populated KV access control data')
}
