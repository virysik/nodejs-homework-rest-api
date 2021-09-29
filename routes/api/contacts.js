const express = require('express')

const ctrl = require('../../controllers/contacts')
const {
  joiContactSchema,
  updateContactJoiSchema,
} = require('../../models/contact')
const { controllerWrapper, validation } = require('../../middlewares')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiContactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put(
  '/:contactId',
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  validation(updateContactJoiSchema),
  controllerWrapper(ctrl.updateFavorite),
)

module.exports = router
