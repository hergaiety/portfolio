const { generateStaticPages } = require('./src/generateHTMLPages');

generateStaticPages().then(() => console.log('✓ Generated html pages'));

