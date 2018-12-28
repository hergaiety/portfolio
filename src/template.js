const { compile } = require('handlebars');
const { readFile } = require('fs-extra');

module.exports = async filename => {
  let template;
  try {
    template = await readFile(`./src/templates/${filename}.hbs`);
    template = template.toString();
  } catch(error) {
    console.error('Could not fetch template', filename, error);
    return;
  }
  return compile(template);
};

