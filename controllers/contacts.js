const contactOperations = require('../model/contacts')
const { NotFound } = require('http-errors')

const getAll = async (req, res) => {
  const contacts = await contactOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  })
}

const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactOperations.getContactById(contactId)

  if (!contact) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result: contact },
  })
}

const add = async (req, res) => {
  const contact = await contactOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: contact },
  })
}

const removeById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactOperations.removeContact(contactId)

  if (!result) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    message: result,
  })
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const contact = await contactOperations.updateContact(contactId, req.body)

  if (!contact) {
    throw new NotFound(`Contact with id:${contactId} was not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result: contact },
  })
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
}
