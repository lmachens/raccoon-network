const path = require('path');
const generateConfig = require('./common');
const OUTPUT_PATH = path.resolve(__dirname, '../dist/dev');

module.exports = generateConfig({
  outputPath: OUTPUT_PATH,
  mode: 'development'
});
