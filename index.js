const { getPinnedRepoJSONs, getStaticPageJSONs } = require('./src/discoverJSONData');
const { generateStaticPages } = require('./src/generateHTMLPages');
const copyStaticAssets = require('./src/copyStaticAssets');

(async () => {
  let repoJSONs = await getPinnedRepoJSONs();
  let staticJSONs = await getStaticPageJSONs();
  await generateStaticPages(repoJSONs.concat(staticJSONs));
  console.log('✓ Generated html pages');
})();

(async () => {
  await copyStaticAssets();
  console.log('✓ Copied static assets');
})();

