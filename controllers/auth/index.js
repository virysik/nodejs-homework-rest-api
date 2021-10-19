const signup = require('./signup')
const verify = require('./verify')
const repeatEmailVerify = require('./repeatEmailVerify')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateSubscr = require('./updateSubscr')
const updateAvatar = require('./updateAvatar')

module.exports = {
  signup,
  verify,
  repeatEmailVerify,
  login,
  logout,
  current,
  updateSubscr,
  updateAvatar,
}
