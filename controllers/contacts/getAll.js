const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getAll = async (req, res) => {
  const { _id } = req.user
  const contacts = await Contact.find(
    { owner: _id },
    '_id name email phone favorite',
  )

  sendSuccessRes(res, { result: contacts })
}

module.exports = getAll
