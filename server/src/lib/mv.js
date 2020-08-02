const path = require('path');
const fs = require('fs');

const moveFile = (file, storagePath) => {
  const filePath = path.join(storagePath, file.name);

  return new Promise((resolve, reject) => {
    fs.promises.access(filePath)
      .then(() => reject(new Error(`File ${file.name} already exists`)))
      .catch(() =>
        file.mv(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      );
  });
};

module.exports = moveFile;
