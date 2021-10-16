const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const contact = await Contact.create(newContact)

  sendSuccessRes(res, { result: contact }, 201)
}

module.exports = add
