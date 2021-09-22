const contactOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactOperations.updateContact(contactId, req.body)

  if (!contact) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result: contact },
  })
}

module.exports = updateById
