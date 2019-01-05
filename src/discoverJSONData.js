const { join } = require('path');
const { readdir, readJson } = require('fs-extra');
const marked = require('marked');
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
  return pinnedRepoData.map(data => {
    data.node.pageType = 'git';
    if (data.node.readme && data.node.readme.text) {
      data.node.readme.html = marked(data.node.readme.text);
    }
    return data.node;
  });
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
    let allData = await Promise.all(readFilesPromises);
    return allData.map(data => {
      if (data.readme && data.readme.text) {
        data.readme.html = marked(data.readme.text);
      }
      return data;
    });
  } catch (error) {
    console.error('Error while reading JSON', error);
    return;
  }
};

module.exports = {
  getPinnedRepoJSONs,
  getStaticPageJSONs,
};
