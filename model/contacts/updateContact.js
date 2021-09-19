const listContacts = require('./listContacts')
const updateAllContacts = require('./updateAllContacts')

async function updateContact(id, data) {
  const allContacts = await listContacts()
  const inx = allContacts.findIndex(
    (contact) => contact.id.toString() === id.toString(),
  )
  if (inx === -1) {
    return null
  }

  const newContact = { ...allContacts[inx], ...data }
  allContacts[inx] = newContact
  await updateAllContacts(allContacts)
  return newContact
}

module.exports = updateContact
