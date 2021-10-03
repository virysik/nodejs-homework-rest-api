const { User } = require('../models')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(_id)
    if (!user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
  }
}

module.exports = authenticate
