const path = require('path');

module.exports = {
  entry: ['./static/script.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
  },
  mode: 'production',
};