const { User } = require('../../models')
const { Conflict } = require('http-errors')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, 'email subscription')

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

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
