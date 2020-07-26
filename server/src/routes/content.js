const router = require('express').Router();
const fs = require('fs');
const processPath = require('../lib/path');

router.get('/:path?', async (req, res, next) => {
  try {
    const dirPath = processPath(req.params.path);
    const dir = await fs.promises.opendir(dirPath.absolutePath);
    const content = { files: [], directories: [] };

    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        content.directories.push(dirent.name);
      } else {
        content.files.push(dirent.name);
      }
    }
    content.directories.sort()
    content.files.sort()

    res.json({ path: dirPath.relativePath, content, success: true });
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
