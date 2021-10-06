const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getAll = async (req, res) => {
  const { _id } = req.user
  // const contacts = await Contact.find(
  //   { owner: _id },
  //   '_id name email phone favorite',
  // )
  const { favorite = null, limit = 20, page = 1 } = req.query

  const optionsSearch = { owner: _id }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const { docs: cats, ...rest } = await Contact.paginate(optionsSearch, {
    limit,
    page,
    populate: { path: 'owner', select: 'email' },
  })

  sendSuccessRes(res, { result: { cats, ...rest } })
}

module.exports = getAll
