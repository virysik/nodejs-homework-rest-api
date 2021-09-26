const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(5).max(20).required(),
  favorite: Joi.boolean(),
})

const updateContactJoiSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'missing field favorite' }),
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiContactSchema,
  updateContactJoiSchema,
  Contact,
}
