const { User } = require('../../models')
const { NotFound, Unauthorized } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, 'email password subscription')

  if (!user) {
    throw new NotFound('Not found')
  }

  if (!user.validPassword(password) || email !== user.email) {
    throw new Unauthorized('Email or password is wrong')
  }

  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })

  const response = {
    email: user.email,
    subscription: user.subscription,
  }

  sendSuccessRes(res, { token, user: response })
}

module.exports = login
