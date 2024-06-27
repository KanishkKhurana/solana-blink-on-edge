const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "none",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    iife: false, 
  },
};
