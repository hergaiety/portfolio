const Handlebars = require('handlebars');
const { readFile, readdir } = require('fs-extra');
const { join, basename } = require('path');

const registerPartials = async () => {
  try {
    let results = await readdir('./src/templates/partials')
    let resultsPromises = results.map(async filename => {
      let filePath = join('./src/templates/partials', filename);
      let partialName = basename(filename, '.hbs');
      let partialContents = await readFile(filePath);
      partialContents = partialContents.toString();
      Handlebars.registerPartial(partialName, partialContents);
    });

    return Promise.all(resultsPromises);
  } catch(error) {
    console.error('Could not read partials in ./src/templates/partials/', error);
    return;
  }
}

const getTemplate = async filename => {
  let template;
  try {
    template = await readFile(`./src/templates/${filename}.hbs`);
    template = template.toString();
  } catch(error) {
    console.error('Could not fetch template', filename, error);
    return;
  }
  return Handlebars.compile(template);
};

module.exports = {
  registerPartials,
  getTemplate,
};

