const { join } = require('path');
const { outputFile } = require('fs-extra');
const { getTemplate, registerPartials } = require('./template');

const distPath = './dist';

const initialize = async () => {
  return registerPartials();
}

const generateIndexPage = async jsonData => {
  let sortedData = jsonData.sort((prev, cur) => new Date(prev.updatedAt) < new Date(cur.updatedAt));
  const indexTemplate = await getTemplate('index');

  try {
    return outputFile(join(distPath, 'index') + '.html', indexTemplate(sortedData));
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
  initialize,
  generateInteriorPages,
  generateIndexPage,
};

