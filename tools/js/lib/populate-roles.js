// const IIOSAccesControl = require('@ignitial/iio-services/lib/accesscontrol').IIOSAccesControl

// TEMP:
const IIOSAccesControl =
  require('@ignitial/iio-services/lib/accesscontrol').IIOSAccesControl

const roles = require('../../data/roles')

exports.populate = async function(setOfUsers) {
  let ac = new IIOSAccesControl({
    namespace: process.env.IIOS_NAMESPACE || 'ignitialio'
  })

  for (let role in roles) {
    await ac.setGrants(role, roles[role])
  }

  // update only if provided
  if (setOfUsers) {
    users = setOfUsers || users
    for (let user in users) {
      await ac.setUserRole(user, users[user])
    }
  }

  ac._connector.destroy()
  console.log('populated KV access control data')
}
