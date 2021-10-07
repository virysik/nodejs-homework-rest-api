const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = await new User({ email })
  newUser.setPassword(password)
  newUser.save()
  const { subscription } = newUser

  sendSuccessRes(res, { user: { email, subscription } }, 201)
}

module.exports = signup
