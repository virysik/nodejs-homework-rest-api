const { User } = require('../models')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new Unauthorized('Not authorized')
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    throw new Unauthorized('Not authorized')
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(_id)
    if (!user.token) {
      throw new Unauthorized('Not authorized')
    }

    req.user = user
    next()
  } catch (error) {
    throw new Unauthorized('Not authorized')
  }
}

module.exports = authenticate
