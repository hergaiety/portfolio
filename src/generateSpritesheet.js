const svgdir2sprite = require('svgdir2sprite');
const { join } = require('path');
const paths = {
  srcIcons: './src/icons',
  distAssets: './dist/assets',
};

module.exports = async () => {
  svgdir2sprite(paths.srcIcons, join(paths.distAssets, 'spritesheet.svg'));
};

