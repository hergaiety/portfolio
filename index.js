const { generateStaticPages } = require('./src/generateHTMLPages');
const copyStaticAssets = require('./src/copyStaticAssets');

generateStaticPages().then(() => console.log('✓ Generated html pages'));
copyStaticAssets().then(() => console.log('✓ Copied static assets'));

