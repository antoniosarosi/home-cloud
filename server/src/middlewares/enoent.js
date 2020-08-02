const { manageErr } = require('./base');

const enoent = (err, req, res, next) => {
  manageErr(err, {
    code: 'ENOENT',
    message: 'File or directory does not exist',
    statusCode: 400,
  });
  next(err);
};

module.exports = enoent;
