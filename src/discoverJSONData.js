const { join } = require('path');
const { readdir, readJson } = require('fs-extra');
const requestGithub = require('./request');
const schema = require('./schema');

const pagesPath = './src/pages';

const getPinnedRepoJSONs = async () => {
  let {
    data: {
      viewer: {
        pinnedRepositories: {
          edges: pinnedRepoData
        }
      }
    }
  } = await requestGithub(schema);
  return pinnedRepoData.map(data => data.node);
};

const getStaticPageJSONs = async () => {
  let fileNames;
  let filesJSON;

  try {
    fileNames = await readdir(pagesPath);
  } catch (error) {
    console.error(error);
    return;
  }

  let readFilesPromises = fileNames.map(fileName => {
    let filePath = join(pagesPath, fileName);
    return readJson(filePath);
  });

  try {
    return await Promise.all(readFilesPromises);
  } catch (error) {
    console.error('Error while reading JSON', error);
    return;
  }
};

module.exports = {
  getPinnedRepoJSONs,
  getStaticPageJSONs,
};
