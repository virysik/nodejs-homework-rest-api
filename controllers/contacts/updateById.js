const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    },
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

module.exports = updateById
