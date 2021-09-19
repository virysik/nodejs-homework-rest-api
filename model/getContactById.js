const listContacts = require('./listContacts')

async function getContactById(contactId) {
  const allContacts = await listContacts()
  const contact = allContacts.find(
    (contact) => contact.id.toString() === contactId.toString(),
  )

  if (!contact) {
    return null
  }
  return contact
}

module.exports = getContactById
