const express = require('express')

const ctrl = require('../../controllers/auth')

const { joiAuthSchema } = require('../../models/user')
const { controllerWrapper, validation } = require('../../middlewares')

const router = express.Router()

router.post(
  '/signup',
  validation(joiAuthSchema),
  controllerWrapper(ctrl.signup),
)
router.post('/login', validation(joiAuthSchema), controllerWrapper(ctrl.login))
router.get('/ logout', controllerWrapper(ctrl.logout))
router.get(
  '/current',
  validation(joiAuthSchema),
  controllerWrapper(ctrl.current),
)

module.exports = router
