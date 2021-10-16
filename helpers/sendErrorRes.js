const sendErrorRes = (res, message = 'Not authorized', status = 401) => {
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
}

module.exports = sendErrorRes
