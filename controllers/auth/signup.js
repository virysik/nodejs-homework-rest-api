const { User } = require('../../models')
const { Conflict } = require('http-errors')
const bCrypt = require('bcryptjs')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, 'email subscription')

  if (user) {
    throw new Conflict('Email in use')
  }

  const hashPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(10))
  await User.create({ email, password: hashPassword })

  res.status(201).json({
    status: 'success',
    code: 201,
    response: {
      user: {
        email,
        subscription: 'starter',
      },
    },
  })
}

module.exports = signup
