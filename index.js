var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var sass        = require('metalsmith-sass');
var layouts     = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata({
    title: "Joe Wroten",
    description: "",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(collections({
    posts: {
      pattern: 'posts/*',
      sortBy: 'order'
    }
  }))
  .use(permalinks())
  .use(sass())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
