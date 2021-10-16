const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getAll = async (req, res) => {
  const { _id } = req.user
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 20,
    page = 1,
  } = req.query

  const optionsSearch = { owner: _id }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const { docs: cats, ...rest } = await Contact.paginate(optionsSearch, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter
      ? filter.split('|').join(' ')
      : '_id name email phone favorite',
    populate: { path: 'owner', select: 'email' },
  })

  sendSuccessRes(res, { result: { cats, ...rest } })
}

module.exports = getAll
