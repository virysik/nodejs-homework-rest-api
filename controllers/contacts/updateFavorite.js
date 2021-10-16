const { Contact } = require('../../models')
const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

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

  sendSuccessRes(res, { result: updateStatusContact })
}

module.exports = updateFavorite
