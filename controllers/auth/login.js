const { User } = require('../../models')
const { NotFound, Unauthorized } = require('http-errors')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, 'email password')

  if (!user) {
    throw new NotFound('Not found')
  }

  if (!user.validPassword(password) || email !== user.email) {
    throw new Unauthorized('Email or password is wrong')
  }

  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user,
    },
  })
}

module.exports = login
