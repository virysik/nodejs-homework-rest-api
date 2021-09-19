const express = require('express')

const contactOperations = require('../../model/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
