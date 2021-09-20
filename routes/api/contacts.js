const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put(
  '/:contactId',
  validation(contactSchema),
  controllerWrapper(ctrl.updateById),
)

module.exports = router
