const router = require('express').Router();
const fileUpload = require('express-fileupload');
const processPath = require('../lib/path');
const moveFile = require('../lib/mv');

router.use(fileUpload());

router.post('/:path?', async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded'
    });
  }

  const dirPath = processPath(req.params.path);
  let files = req.files.file;
  if (!Array.isArray(files)) {
    files = [files];
  }

  try {
    for (const file of files) {
      await moveFile(file, dirPath.absolutePath);
    }
  } catch (err) {
    // Sys error
    if (err.code) {
      return next(err);
    }

    return res.status(400).json({
      success: false,
      message: err.message,
      path: dirPath.relativePath
    });
  }

  res.json({
    success: true,
    message: 'Files successfully uploaded',
    path: dirPath.relativePath
  });
});

module.exports = router;
