const { User } = require('../../models')
const fs = require('fs/promises')
const path = require('path')
const { sendSuccessRes, jimpCrop } = require('../../helpers')

const updateAvatar = async (req, res, err) => {
  const { filename, originalname, path: tmpPath } = req.file

  await jimpCrop(tmpPath)

  const uniqueName = filename + originalname
  const uploadDir = path.join(__dirname, '../../', 'public')
  const filePath = path.join(uploadDir, '/avatars', uniqueName)

  try {
    await fs.rename(tmpPath, filePath)
  } catch (error) {
    await fs.unlink(tmpPath)
  }

  const avatarURL = path.join('/public/avatars', uniqueName)
  const { _id } = req.user
  await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    },
  )

  sendSuccessRes(res, { avatarURL })
}

module.exports = updateAvatar
