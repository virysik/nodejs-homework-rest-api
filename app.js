const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const boolParser = require('express-query-boolean')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/auth/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.static('public'))
app.use(express.json({ limit: 10000 }))
app.use(boolParser())

app.use('/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

module.exports = app
