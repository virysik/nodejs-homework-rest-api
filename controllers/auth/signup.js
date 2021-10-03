const { User } = require('../../models')
const { Conflict } = require('http-errors')

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

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  })
}

module.exports = signup
