const manageErr = (err, settings) => {
  if (err.code !== settings.code) {
    return false;
  }
  err.message = settings.message;
  err.statusCode = settings.statusCode;

  return true;
};

module.exports = { manageErr };
