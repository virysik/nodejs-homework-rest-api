const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const gravatar = require('gravatar')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = await new User({ email })
  newUser.setPassword(password)
  newUser.avatarURL = gravatar.url(email)
  newUser.save()

  const { subscription, avatarURL } = newUser

  sendSuccessRes(res, { user: { email, subscription, avatarURL } }, 201)
}

module.exports = signup
