const express = require('express')

const ctrl = require('../../controllers/auth')

const { joiAuthSchema, joiSubscrSchema } = require('../../models/user')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares')

const router = express.Router()

router.post(
  '/signup',
  validation(joiAuthSchema),
  controllerWrapper(ctrl.signup),
)
router.post('/login', validation(joiAuthSchema), controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current))
router.patch(
  '/',
  authenticate,
  validation(joiSubscrSchema),
  controllerWrapper(ctrl.updateSubscr),
)
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
)

module.exports = router
