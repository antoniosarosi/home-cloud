const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const processPath = require('../lib/path');

router.post('/:path?', async (req, res, next) => {
  const dirPath = processPath(req.params.path);
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'No name was specified',
    });
  }

  try {
    await fs.promises.mkdir(path.join(dirPath.absolutePath, name));
  } catch (e) {
    return next(e);
  }

  res.json({ success: true, message: 'Directory created' });
});

module.exports = router;
