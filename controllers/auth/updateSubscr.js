const { User } = require('../../models')

const updateSubscr = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    },
  )
  res.json({
    status: 'success',
    code: 200,
    data: updatedUser,
  })
}

module.exports = updateSubscr
