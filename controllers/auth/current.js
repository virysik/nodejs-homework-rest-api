const { User } = require('../../models')

const current = async (req, res) => {
  const { _id } = req.user
  const user = await User.findOne({ _id }, 'email subscription')
  if (!user) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
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
