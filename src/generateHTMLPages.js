const { join } = require('path');
const { outputFile } = require('fs-extra');
const getTemplate = require('./template');

const distPath = './dist';

const generateIndexPage = async jsonData => {
  const indexTemplate = await getTemplate('index');

  try {
    return outputFile(join(distPath, 'index') + '.html', indexTemplate(jsonData));
  } catch (error) {
    console.error('Error while writing index html file', error);
    return;
  }
};

const generateInteriorPages = async jsonData => {
  const interiorTemplate = await getTemplate('interior');
  const saveAsInteriorHTML = async json => {
    return outputFile(join(distPath, json.name) + '.html', interiorTemplate(json));
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
