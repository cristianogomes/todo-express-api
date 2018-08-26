module.exports = () => {
  return (err, req, res, next) => {
    if (!err.status) {
      err.status = 500
    }

    return res.status(err.status).json({
      message: err.message
    })
  }
}
