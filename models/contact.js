const { Schema, SchemaTypes, model } = require('mongoose')
const Joi = require('joi')
const mongoosePaginate = require('mongoose-paginate-v2')

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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
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

contactSchema.plugin(mongoosePaginate)
const Contact = model('contact', contactSchema)

module.exports = {
  joiContactSchema,
  updateContactJoiSchema,
  Contact,
}
