const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [6, 'Password has to contain minimum 6 symbols'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
)

const joiAuthSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string()
    .required()
    .pattern(/^\S+@\S+\.\S+$/)
    .messages({
      'string.pattern.base': 'Please enter the valid email',
    }),
  subscription: Joi.string().default('starter'),
  token: Joi.string().default(null),
  avatar: Joi.string(),
})

const joiSubscrSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function () {
  const payload = { _id: this._id }
  return jwt.sign(payload, SECRET_KEY)
}

const User = model('user', userSchema)

module.exports = {
  joiAuthSchema,
  joiSubscrSchema,
  User,
}
