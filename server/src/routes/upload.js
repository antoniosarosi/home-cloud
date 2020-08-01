const router = require('express').Router();
const fileUpload = require('express-fileupload');
const processPath = require('../lib/path');
const moveFile = require('../lib/mv');
const fs = require("fs");

router.use(fileUpload());

async function searchFile(path, name) {
  try {
    const dirPath = path
    const dir = await fs.promises.opendir(dirPath.absolutePath);
    const content = [];
    var save = true;
    for await (const dirent of dir) {   
    if (!dirent.isDirectory()) {
        content.push(dirent.name);
      }
    }

   
   content.forEach(element => {
    if (element == name) {
      save = false;
    }
   });
   return save;
  }
  catch (err) {
    console.log(err);
    return err;
  }
}

router.post('/:path?', async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded',
    });
  }

  const dirPath = processPath(req.params.path);
  let files = req.files.file;
  if (!Array.isArray(files)) {
    files = [files];
  }

  try {
    for (const file of files) {
      const resulNameFile = await searchFile(dirPath, file.name)
	       if (resulNameFile) {
      await moveFile(file, dirPath.absolutePath);
    } else {
      const tmpfile = file;
      var name = tmpfile.name.substr(0, (tmpfile.name.lastIndexOf(".")));
      var extension = tmpfile.name.substr(tmpfile.name.lastIndexOf("."));
      tmpfile.name = name + "(1)" + extension;
      var resulNameTmpFile = await searchFile(dirPath, tmpfile.name)
      let i = 1;
      while(!resulNameTmpFile){
         tmpfile.name = name + "(" + i + ")" + extension;
         resulNameTmpFile = await searchFile(dirPath, tmpfile.name)
         i++
      }
      await moveFile(tmpfile, dirPath.absolutePath);
    }

    }
  } catch (err) {
    return next(err);
  }

  res.json({
    success: true,
    message: 'Files successfully uploaded',
    path: dirPath.relativePath,
  });
});

module.exports = router;
