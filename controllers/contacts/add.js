const { Contact } = require('../../models')

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const contact = await Contact.create(newContact)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: contact },
  })
}

module.exports = add
