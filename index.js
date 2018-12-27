const { compile } = require('handlebars');
const requestGithub = require('./src/request');
const { join } = require('path');
const { readdir, readJson, outputFile } = require('fs-extra');

const pagesPath = './src/pages';
const dist = './dist';
const exampleHBS = compile(`
  <h1>{{name}}</h1>
  <hr />
`);

(async () => {
  let fileNames;
  let filesJSON;
  let {
    data: {
      viewer: {
        pinnedRepositories: {
          edges: pinnedRepoData
        }
      }
    }
  } = await requestGithub(require('./src/schema'));
  pinnedRepoData = pinnedRepoData.map(data => data.node);

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
    filesJSON = await Promise.all(readFilesPromises);
  } catch (error) {
    console.error('Error while reading JSON', error);
    return;
  }

  let combinedJSONs = filesJSON.concat(pinnedRepoData);

  let writeFilesPromises = combinedJSONs.map(json => {
    let fileName = json.name.replace(/[^a-zA-Z\d:]/g, '').toLowerCase();
    return outputFile(join(dist, fileName) + '.html', exampleHBS(json));
  });

  try {
    await Promise.all(writeFilesPromises);
  } catch (error) {
    console.error('Error while writing html files', error);
    return;
  }
})();

