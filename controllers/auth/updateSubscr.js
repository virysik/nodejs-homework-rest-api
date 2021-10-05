const { User } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

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

  sendSuccessRes(res, { updatedUser })
}

module.exports = updateSubscr
