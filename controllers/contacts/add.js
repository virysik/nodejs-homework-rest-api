const contactOperations = require('../../model/contacts')

const add = async (req, res) => {
  const contact = await contactOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: contact },
  })
}

module.exports = add
