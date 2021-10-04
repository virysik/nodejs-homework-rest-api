const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { _id } = req.user
  const { contactId } = req.params
  const contact = await Contact.findOne(
    { _id: contactId, owner: _id },
    '_id name email phone favorite',
  )

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
