const listContacts = require('./listContacts')
const updateAllContacts = require('./updateAllContacts')
const { nanoid } = require('nanoid')

async function addContact(name, email, phone) {
  const allContacts = await listContacts()

  const newContact = { name, email, phone, id: nanoid() }
  allContacts.push(newContact)
  await updateAllContacts(allContacts)
  return newContact
}

module.exports = addContact
