const chalk = require('chalk');
const { getPinnedRepoJSONs, getStaticPageJSONs } = require('./src/discoverJSONData');
const { generateIndexPage, generateInteriorPages } = require('./src/generateHTMLPages');
const copyStaticAssets = require('./src/copyStaticAssets');

(async () => {
  console.log(chalk.blue('● Fetching Pinned Repo Data...'));
  let repoJSONs = await getPinnedRepoJSONs();
  console.log(chalk.blue('● Fetching Static Page Data...'));
  let staticJSONs = await getStaticPageJSONs();

  console.log(chalk.blue('● Generating index html page...'));
  await generateIndexPage(repoJSONs.concat(staticJSONs));
  console.log(chalk.green('✓ Generated index html page'));

  console.log(chalk.blue('● Generating interior html pages...'));
  await generateInteriorPages(repoJSONs.concat(staticJSONs));
  console.log(chalk.green('✓ Generated interior html pages'));
})();

(async () => {
  console.log(chalk.blue('● Copying static assets...'));
  await copyStaticAssets();
  console.log(chalk.green('✓ Copied static assets'));
})();

