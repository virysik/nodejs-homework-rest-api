const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { sendErrorRes } = require('../helpers')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    sendErrorRes(res)
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    sendErrorRes(res)
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(_id)
    if (!user.token) {
      sendErrorRes(res)
    }

    req.user = user
    next()
  } catch (error) {
    sendErrorRes(res)
  }
}

module.exports = authenticate
