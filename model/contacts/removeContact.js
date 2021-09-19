const listContacts = require('./listContacts')
const updateAllContacts = require('./updateAllContacts')

async function removeContact(contactId) {
  const allContacts = await listContacts()
  const inx = allContacts.findIndex(
    (contact) => contact.id.toString() === contactId.toString(),
  )
  if (inx === -1) {
    return null
  }

  allContacts.splice(inx, 1)
  await updateAllContacts(allContacts)
  return 'Success remove'
}

module.exports = removeContact
