const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const removeById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)

  if (!result) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    message: result,
  })
}

module.exports = removeById
