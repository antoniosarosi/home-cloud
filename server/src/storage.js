require('dotenv').config();

const storage = process.env.HOME_CLOUD_STORAGE;
if (!storage) {
  console.error(
    'Storage path not defined,',
    'set a value for HOME_CLOUD_STORAGE environment variable'
  );
  process.exit(1);
}

module.exports = storage;
