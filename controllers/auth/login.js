const { User } = require('../../models')
const { NotFound, Unauthorized } = require('http-errors')
const bCrypt = require('bcryptjs')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, 'email password')

  if (!user) {
    throw new NotFound('Not found')
  }

  if (!bCrypt.compareSync(password, user.password) || email !== user.email) {
    throw new Unauthorized('Email or password is wrong')
  }

  const token = '1234.5678.gghj'
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
