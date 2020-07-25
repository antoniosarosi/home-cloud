const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

require('dotenv').config();

router.use(fileUpload());

const storage = process.env.STORAGE;

const processPath = (storagePath) => {
  const relativePath = storagePath ? storagePath.replace(/-/g, '/') : '/';
  return { relativePath, absolutePath: path.join(storage, relativePath) };
};

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

    res.json({ path: dirPath.relativePath, content });
  }
  catch (err) {
    next(err);
  }
});

const moveFile = (file, storagePath) => {
  return new Promise((resolve, reject) => {
    file.mv(path.join(storagePath, file.name), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

router.post('/:path?', async (req, res, next) => {
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
    return next(err);
  }
  
  res.json({
    message: 'Files successfully stored',
    path: dirPath.relativePath
  });
});

module.exports = router;
