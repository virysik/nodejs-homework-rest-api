const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSuccessRes, sendEmail } = require('../../helpers')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const verifyToken = nanoid()
  const newUser = await new User({ email, verifyToken })
  newUser.setPassword(password)
  newUser.avatarURL = gravatar.url(email)
  await newUser.save()

  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<p>Please confirm your email
            <a href="http://localhost:3000/users/verify/${verifyToken}" target="_blank"><b>here</b></a></p>
            `,
  }
  await sendEmail(data)

  const { subscription, avatarURL } = newUser

  sendSuccessRes(res, { user: { email, subscription, avatarURL } }, 201)
}

module.exports = signup
