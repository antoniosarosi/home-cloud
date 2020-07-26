const path = require('path');
const storage = require('../storage');

const processPath = (urlPath) => {
  const relativePath = urlPath ? urlPath.replace(/-/g, '/') : '/';
  return { relativePath, absolutePath: path.join(storage, relativePath) };
};

module.exports = processPath;
