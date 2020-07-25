const enoent = (err, req, res, next) => {
  console.log(err);
  if (err.code === 'ENOENT') {
    err.message = 'Directory does not exist';
    err.statusCode = 400;
  }
  res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = enoent;
