const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

async function updateAllContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

module.exports = updateAllContacts
