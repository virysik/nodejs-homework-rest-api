const listContacts = require('./listContacts')
const updateAllContacts = require('./updateAllContacts')
const { nanoid } = require('nanoid')

async function addContact(data) {
  const allContacts = await listContacts()

  const newContact = { ...data, id: nanoid() }
  allContacts.push(newContact)
  await updateAllContacts(allContacts)
  return newContact
}

module.exports = addContact
