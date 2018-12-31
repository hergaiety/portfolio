const { join } = require('path');
const { outputFile } = require('fs-extra');
const marked = require('marked');
const getTemplate = require('./template');

const distPath = './dist';

const generateIndexPage = async jsonData => {
  console.log('Index page...TODO');
};

const generateInteriorPages = async jsonData => {
  const interiorTemplate = await getTemplate('interior');
  const saveAsInteriorHTML = async json => {
    let fileName = json.name.replace(/[^a-zA-Z\d:]/g, '').toLowerCase();
    if (json.readme && json.readme.text) {
      json.readme.html = marked(json.readme.text);
    }
    return outputFile(join(distPath, fileName) + '.html', interiorTemplate(json));
  }

  try {
    return await Promise.all(jsonData.map(saveAsInteriorHTML));
  } catch (error) {
    console.error('Error while writing html files', error);
    return;
  }
};

module.exports = {
  generateInteriorPages,
  generateIndexPage,
};
