const path = require('path');

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

module.exports = moveFile;
