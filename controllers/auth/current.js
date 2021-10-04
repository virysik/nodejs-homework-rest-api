const { User } = require('../../models')
const { Unauthorized } = require('http-errors')

const current = async (req, res) => {
  const { _id } = req.user
  const user = await User.findOne({ _id }, 'email subscription')

  if (!user) {
    throw new Unauthorized('Not authorized')
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  })
}

module.exports = current
