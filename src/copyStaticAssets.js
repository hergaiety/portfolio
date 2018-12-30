const { readdir, copyFile } = require('fs-extra');
const { extname, join } = require('path');

const paths = {
  srcAssets: './src/assets',
  distAssets: './dist/assets',
}

const _discoverAssets = async () => {
  try {
    return await readdir(paths.srcAssets);
  } catch (error) {
    console.error('Unable to find assets to copy', error);
    return [];
  }
};

const _copyAssets = async assets => {
  try {
    assets.forEach(asset => {
      let srcFile = join(paths.srcAssets, asset);
      let distFile = join(paths.distAssets, asset);
      return copyFile(srcFile, distFile);
    });
  } catch (error) {
    console.error('Unable to copy assets', error);
    return;
  }
};

module.exports = async () => {
  let assets = await _discoverAssets();
  _copyAssets(assets);
};

