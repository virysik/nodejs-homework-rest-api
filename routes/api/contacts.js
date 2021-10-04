const express = require('express')

const ctrl = require('../../controllers/contacts')
const {
  joiContactSchema,
  updateContactJoiSchema,
} = require('../../models/contact')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post(
  '/',
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.add),
)

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeById))

router.put(
  '/:contactId',
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(updateContactJoiSchema),
  controllerWrapper(ctrl.updateFavorite),
)

module.exports = router
