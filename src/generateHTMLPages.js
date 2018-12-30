const { join } = require('path');
const { outputFile } = require('fs-extra');
const marked = require('marked');
const getTemplate = require('./template');
const { getPinnedRepoJSONs, getStaticPageJSONs } = require('./discoverJSONData');

const distPath = './dist';

const generateStaticPages = async () => {
  const interiorTemplate = await getTemplate('interior');
  let repoJSONs = await getPinnedRepoJSONs();
  let staticJSONs = await getStaticPageJSONs();
  let combinedJSONs = repoJSONs.concat(staticJSONs);
  const saveAsInteriorHTML = async json => {
    let fileName = json.name.replace(/[^a-zA-Z\d:]/g, '').toLowerCase();
    if (json.readme && json.readme.text) {
      json.readme.html = marked(json.readme.text);
    }
    return outputFile(join(distPath, fileName) + '.html', interiorTemplate(json));
  }

  try {
    return await Promise.all(combinedJSONs.map(saveAsInteriorHTML));
  } catch (error) {
    console.error('Error while writing html files', error);
    return;
  }
};

module.exports = {
  generateStaticPages,
};
