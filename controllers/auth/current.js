const { User } = require('../../models')
const { Unauthorized } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

const current = async (req, res) => {
  const { _id } = req.user
  const user = await User.findOne({ _id }, 'email subscription')

  if (!user) {
    throw new Unauthorized('Not authorized')
  }

  sendSuccessRes(res, { user })
}

module.exports = current
