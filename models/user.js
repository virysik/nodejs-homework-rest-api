const { Schema, SchemaTypes, model } = require('mongoose')
const Joi = require('joi')

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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const joiAuthSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string()
    .required()
    .pattern(/^\S+@\S+\.\S+$/),
  subscription: Joi.string().default('starter'),
  token: Joi.string().default(null),
  owner: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  joiAuthSchema,
  User,
}
