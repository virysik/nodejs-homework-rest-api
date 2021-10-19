const { User } = require('../../models')
const { sendSuccessRes, sendErrorRes, sendEmail } = require('../../helpers')

const repeatEmailVerify = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return sendErrorRes(res, 'missing required field email', 400)
  }
  const user = await User.findOne({ email })
  const { verify, verifyToken } = user

  if (verify) {
    return sendErrorRes(res, 'Verification has already been passed', 400)
  }

  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<p>Please confirm your email
            <a href="http://localhost:3000/users/verify/${verifyToken}" target="_blank"><b>here</b></a></p>
            `,
  }
  await sendEmail(data)
  sendSuccessRes(res, { message: 'Verification email sent' })
}

module.exports = repeatEmailVerify
