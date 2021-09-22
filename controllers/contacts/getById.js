const contactOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactOperations.getContactById(contactId)

  if (!contact) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result: contact },
  })
}

module.exports = getById
