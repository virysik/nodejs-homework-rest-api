const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

const { User } = require('../../models')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })

  sendSuccessRes(res, { message: 'Verification successful' })
}

module.exports = verify
