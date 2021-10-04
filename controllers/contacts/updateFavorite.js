const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const updateFavorite = async (req, res) => {
  const { _id } = req.user
  const { favorite } = req.body
  const { contactId } = req.params
  const updateStatusContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    {
      new: true,
    },
  )
  if (!updateStatusContact) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result: updateStatusContact },
  })
}

module.exports = updateFavorite
