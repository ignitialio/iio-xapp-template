// const IIOSAccesControl = require('@ignitial/iio-services/lib/accesscontrol').IIOSAccesControl

// TEMP:
const IIOSAccesControl =
  require('@ignitial/iio-app-server/node_modules/@ignitial/iio-services/lib/accesscontrol').IIOSAccesControl

const roles = require('../data/roles')
var users = require('../data/users')

exports.populate = async function(setOfUsers) {
  console.log('create IIOS ac instance')
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

  console.log('end of access control pouplate: destroy IIOS ac instance')
  ac._connector.destroy()
}
