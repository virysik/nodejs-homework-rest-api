const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const removeById = async (req, res) => {
  const { _id } = req.user
  const { contactId } = req.params
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: _id })

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
