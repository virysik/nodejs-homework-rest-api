const express = require('express')

const { contactSchema } = require('../../schemas')
const contactOperations = require('../../model/contacts')

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactOperations.getContactById(contactId)

    if (!contact) {
      const error = new Error(`Contact with id:${contactId} was not found`)
      error.status = 404
      throw error
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result: contact },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message.replace(/"/g, ''))
      err.status = 400
      throw err
    }
    const contact = await contactOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result: contact },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.removeContact(contactId)

    if (!result) {
      const error = new Error(`Contact with id:${contactId} was not found`)
      error.status = 404
      throw error
    }

    res.json({
      status: 'success',
      code: 200,
      message: result,
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message.replace(/"/g, ''))
      err.status = 400
      throw err
    }
    const { contactId } = req.params
    const contact = await contactOperations.updateContact(contactId, req.body)

    if (!contact) {
      const error = new Error(`Contact with id:${contactId} was not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result: contact },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
