const { manageErr } = require('./base');

const eexist = (err, req, res, next) => {
  manageErr(err, {
    code: 'EEXIST',
    message: 'Directory already exists',
    statusCode: 400,
  });
  next(err);
};

module.exports = eexist;
